-- Create DB (run from postgres or another DB), then connect
CREATE DATABASE karsu WITH ENCODING 'UTF8' TEMPLATE template1;
\connect karsu

-- UUIDs for refresh_tokens.id
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- ENUM types (use TypeORM-like names to minimize diffs)
-- =========================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='devices_status_enum') THEN
    CREATE TYPE devices_status_enum AS ENUM ('Active','Available','Lost','Retired');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='workers_emergency_contact_relation_enum') THEN
    CREATE TYPE workers_emergency_contact_relation_enum AS ENUM ('Parent','Spouse','Sibling','Friend');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='worker_health_conditions_severity_enum') THEN
    CREATE TYPE worker_health_conditions_severity_enum AS ENUM ('Mild','Moderate','Severe');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='worker_health_conditions_status_enum') THEN
    CREATE TYPE worker_health_conditions_status_enum AS ENUM ('Active','Managed','Stable');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='alerts_alert_type_enum') THEN
    CREATE TYPE alerts_alert_type_enum AS ENUM ('HIGH_PULSE','GAS_EXPOSURE','INACTIVITY');
  END IF;
END $$;

-- =========================
-- CORE TABLES
-- =========================

-- Workers
CREATE TABLE IF NOT EXISTS workers (
  worker_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  phone      VARCHAR(20)  NOT NULL,
  email      VARCHAR(100),
  emergency_contact_name  VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relation workers_emergency_contact_relation_enum
);

-- Devices
CREATE TABLE IF NOT EXISTS devices (
  device_id VARCHAR(50) PRIMARY KEY,
  model     VARCHAR(50),
  status    devices_status_enum NOT NULL DEFAULT 'Available'
);

-- Many-to-one: worker ↔ device assignments
CREATE TABLE IF NOT EXISTS worker_device_assignments (
  assignment_id SERIAL PRIMARY KEY,
  worker_id     INT NOT NULL,
  device_id     VARCHAR(50) NOT NULL,
  assigned_date DATE NOT NULL,
  unassigned_date DATE,
  CONSTRAINT fk_wda_worker
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_wda_device
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
    ON DELETE CASCADE
);

-- Sensor readings (composite primary key)
CREATE TABLE IF NOT EXISTS sensor_readings (
  device_id       VARCHAR(50) NOT NULL,
  "timestamp"     TIMESTAMPTZ NOT NULL,
  heart_rate      INT NOT NULL,
  gas_level       DECIMAL(5,2) NOT NULL,
  step_count      INT NOT NULL,
  stationary_time INT NOT NULL,
  battery_level   SMALLINT NOT NULL,
  PRIMARY KEY (device_id, "timestamp"),
  CONSTRAINT fk_sr_device
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
    ON DELETE CASCADE
);

-- Alternate sensor readings (timestamp primary key)
CREATE TABLE IF NOT EXISTS sensor_readings_alt (
  "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
  moisture     NUMERIC(5,2) NOT NULL,
  PRIMARY KEY ("timestamp")
);

-- Shift attendance
CREATE TABLE IF NOT EXISTS shift_attendance (
  attendance_id  SERIAL PRIMARY KEY,
  worker_id      INT NOT NULL,
  shift_date     DATE NOT NULL,
  clock_in_time  TIME NOT NULL,
  clock_out_time TIME,
  CONSTRAINT fk_sa_worker
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    ON DELETE CASCADE
);

-- Worker health conditions
CREATE TABLE IF NOT EXISTS worker_health_conditions (
  condition_id   SERIAL PRIMARY KEY,
  worker_id      INT NOT NULL,
  condition_name VARCHAR(100) NOT NULL,
  severity       worker_health_conditions_severity_enum NOT NULL,
  diagnosis_date DATE NOT NULL,
  status         worker_health_conditions_status_enum NOT NULL,
  notes          TEXT,
  CONSTRAINT fk_whc_worker
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    ON DELETE CASCADE
);

-- Worker health incidents (reuses severity enum)
CREATE TABLE IF NOT EXISTS worker_health_incidents (
  incident_id    SERIAL PRIMARY KEY,
  worker_id      INT NOT NULL,
  incident_name  VARCHAR(100) NOT NULL,
  description    TEXT NOT NULL,
  severity       worker_health_conditions_severity_enum NOT NULL,
  incident_date  DATE NOT NULL,
  resolution_date DATE,
  duration       INT,
  notes          TEXT,
  CONSTRAINT fk_whi_worker
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    ON DELETE CASCADE
);

-- Alerts
CREATE TABLE IF NOT EXISTS alerts (
  alert_id           SERIAL PRIMARY KEY,
  worker_id          INT NOT NULL,
  "timestamp"        TIMESTAMPTZ NOT NULL,
  alert_type         alerts_alert_type_enum NOT NULL,
  metric_value       DECIMAL(10,2) NOT NULL,
  threshold_value    DECIMAL(10,2) NOT NULL,
  resolved_timestamp TIMESTAMPTZ,
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_alert_worker
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    ON DELETE CASCADE
);

-- Roles & Permissions
CREATE TABLE IF NOT EXISTS roles (
  role_id          SERIAL PRIMARY KEY,
  role_name        VARCHAR(50) NOT NULL,
  description      TEXT,
  max_pulse        INT,
  max_gas_exposure DECIMAL(5,2),
  max_inactivity   INT
);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_roles_role_name ON roles(role_name);

CREATE TABLE IF NOT EXISTS permissions (
  permission_id SERIAL PRIMARY KEY,
  name          VARCHAR(50) NOT NULL,
  description   TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_permissions_name ON permissions(name);

-- Role-Permission join (ManyToMany)
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_rp_role
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_rp_perm
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
    ON DELETE CASCADE
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  user_id       SERIAL PRIMARY KEY,
  email         VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  token_version INT NOT NULL DEFAULT 0,
  role_id       INT,
  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    ON DELETE SET NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_users_email ON users(email);

-- Refresh Tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jti          VARCHAR(255) NOT NULL,
  hashedToken  VARCHAR(255) NOT NULL,
  user_id      INT NOT NULL,
  revoked      BOOLEAN NOT NULL DEFAULT FALSE,
  replacedBy   VARCHAR(255),
  expiresAt    TIMESTAMPTZ NOT NULL,
  createdAt    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rt_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_refresh_tokens_jti ON refresh_tokens(jti);
