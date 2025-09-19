-- seed_db.sql — final seeding script for the Karsu DB
-- Run:
--   psql -U postgres -h localhost -d karsu -f seed_db.sql

BEGIN;
SET search_path TO public;
SET client_min_messages = WARNING;
SET synchronous_commit = off;

-- =========================
-- Helper functions
-- =========================

-- Simple picker from text[]
CREATE OR REPLACE FUNCTION _choice(vals text[])
RETURNS text LANGUAGE SQL IMMUTABLE STRICT AS $$
  SELECT vals[1 + floor(random() * array_length(vals,1))::int];
$$;

-- Name generators
CREATE OR REPLACE FUNCTION _fname(i int)
RETURNS text LANGUAGE SQL IMMUTABLE AS $$
  SELECT CASE (i % 10)
    WHEN 0 THEN 'Ali' WHEN 1 THEN 'Reza' WHEN 2 THEN 'Sara' WHEN 3 THEN 'Fatemeh' WHEN 4 THEN 'Mehdi'
    WHEN 5 THEN 'Maryam' WHEN 6 THEN 'Saeed' WHEN 7 THEN 'Neda' WHEN 8 THEN 'Hossein' ELSE 'Mina' END;
$$;

CREATE OR REPLACE FUNCTION _lname(i int)
RETURNS text LANGUAGE SQL IMMUTABLE AS $$
  SELECT CASE (i % 10)
    WHEN 0 THEN 'Ahmadi' WHEN 1 THEN 'Hosseini' WHEN 2 THEN 'Karimi' WHEN 3 THEN 'Mohammadi' WHEN 4 THEN 'Ebrahimi'
    WHEN 5 THEN 'Rahimi' WHEN 6 THEN 'Rezaei' WHEN 7 THEN 'Abbasi' WHEN 8 THEN 'Ghasemi' ELSE 'Nazari' END;
$$;

-- Enum pickers that RETURN the actual enum types (no implicit cast issues)
CREATE OR REPLACE FUNCTION _ec_relation()
RETURNS workers_emergency_contact_relation_enum
LANGUAGE SQL IMMUTABLE AS $$
  SELECT (ARRAY[
    'Parent'::workers_emergency_contact_relation_enum,
    'Spouse'::workers_emergency_contact_relation_enum,
    'Sibling'::workers_emergency_contact_relation_enum,
    'Friend'::workers_emergency_contact_relation_enum
  ])[1 + floor(random()*4)::int];
$$;

CREATE OR REPLACE FUNCTION _device_status()
RETURNS devices_status_enum
LANGUAGE SQL IMMUTABLE AS $$
  SELECT (ARRAY[
    'Active'::devices_status_enum,
    'Available'::devices_status_enum,
    'Lost'::devices_status_enum,
    'Retired'::devices_status_enum
  ])[1 + floor(random()*4)::int];
$$;

CREATE OR REPLACE FUNCTION _whc_severity()
RETURNS worker_health_conditions_severity_enum
LANGUAGE SQL IMMUTABLE AS $$
  SELECT (ARRAY[
    'Mild'::worker_health_conditions_severity_enum,
    'Moderate'::worker_health_conditions_severity_enum,
    'Severe'::worker_health_conditions_severity_enum
  ])[1 + floor(random()*3)::int];
$$;

CREATE OR REPLACE FUNCTION _whc_status()
RETURNS worker_health_conditions_status_enum
LANGUAGE SQL IMMUTABLE AS $$
  SELECT (ARRAY[
    'Active'::worker_health_conditions_status_enum,
    'Managed'::worker_health_conditions_status_enum,
    'Stable'::worker_health_conditions_status_enum
  ])[1 + floor(random()*3)::int];
$$;

CREATE OR REPLACE FUNCTION _alert_type()
RETURNS alerts_alert_type_enum
LANGUAGE SQL IMMUTABLE AS $$
  SELECT (ARRAY[
    'HIGH_PULSE'::alerts_alert_type_enum,
    'GAS_EXPOSURE'::alerts_alert_type_enum,
    'INACTIVITY'::alerts_alert_type_enum
  ])[1 + floor(random()*3)::int];
$$;

-- =========================
-- Roles / Permissions / Users
-- =========================

WITH r(name, descr, max_pulse, max_gas, max_inact) AS (
  VALUES
  ('Admin','Full access',180, 10.00, 60),
  ('Supervisor','Manage workers & alerts',160, 8.00, 90),
  ('Operator','Operate devices, view dashboards',150, 6.00, 120),
  ('Viewer','Read-only', NULL::int, NULL::numeric, NULL::int)
)
INSERT INTO roles(role_name, description, max_pulse, max_gas_exposure, max_inactivity)
SELECT name, descr, max_pulse, max_gas, max_inact
FROM r
ON CONFLICT DO NOTHING;

WITH p(name, descr) AS (
  VALUES
  ('READ_WORKERS','View workers'),
  ('MANAGE_WORKERS','Create/Update workers'),
  ('READ_DEVICES','View devices'),
  ('MANAGE_DEVICES','Assign/unassign devices'),
  ('READ_ALERTS','View alerts & history'),
  ('ACK_ALERTS','Acknowledge/resolve alerts'),
  ('READ_TELEMETRY','View sensor data'),
  ('READ_ROLES','View roles/permissions'),
  ('MANAGE_ROLES','Edit roles/permissions'),
  ('READ_USERS','View users'),
  ('MANAGE_USERS','Create/disable users')
)
INSERT INTO permissions(name, description)
SELECT name, descr FROM p
ON CONFLICT (name) DO NOTHING;

-- Grants: idempotent
WITH rp AS (
  SELECT r.role_id, p.permission_id, r.role_name, p.name AS perm_name
  FROM roles r CROSS JOIN permissions p
)
INSERT INTO role_permissions(role_id, permission_id)
SELECT role_id, permission_id
FROM rp
WHERE (role_name = 'Admin')
   OR (role_name = 'Supervisor' AND perm_name IN ('READ_WORKERS','MANAGE_WORKERS','READ_DEVICES','MANAGE_DEVICES','READ_ALERTS','ACK_ALERTS','READ_TELEMETRY'))
   OR (role_name = 'Operator'   AND perm_name IN ('READ_WORKERS','READ_DEVICES','READ_ALERTS','ACK_ALERTS','READ_TELEMETRY'))
   OR (role_name = 'Viewer'     AND perm_name IN ('READ_WORKERS','READ_DEVICES','READ_ALERTS','READ_TELEMETRY'))
ON CONFLICT DO NOTHING;

-- 40 users with random roles
WITH g AS (
  SELECT
    gs AS i,
    'user'||gs||'@example.com'::text AS email,
    'bcrypt$2a$10$abcdefghijklmnopqrstuv'::text AS password_hash
  FROM generate_series(1,40) gs
)
INSERT INTO users(email, password_hash, token_version, role_id)
SELECT g.email, g.password_hash, 0, (SELECT role_id FROM roles ORDER BY random() LIMIT 1)
FROM g
ON CONFLICT (email) DO NOTHING;

-- =========================
-- Workers & Devices
-- =========================

-- 500 workers
INSERT INTO workers(first_name, last_name, phone, email, emergency_contact_name, emergency_contact_phone, emergency_contact_relation)
SELECT
  _fname(gs),
  _lname(gs),
  '09'||lpad((floor(random()*900000000)+100000000)::int::text, 9, '0'),
  'worker'||gs||'@example.com',
  'EC '||_fname(gs)||' '||_lname(gs),
  '09'||lpad((floor(random()*900000000)+100000000)::int::text, 9, '0'),
  _ec_relation()
FROM generate_series(1,500) gs;

-- 300 devices
INSERT INTO devices(device_id, model, status)
SELECT
  'DEV-'||to_char(gs,'FM00000'),
  'Model-'||((1 + floor(random()*8))::int),
  _device_status()
FROM generate_series(1,300) gs
ON CONFLICT (device_id) DO NOTHING;

-- One current/past assignment per device
INSERT INTO worker_device_assignments(worker_id, device_id, assigned_date, unassigned_date)
SELECT
  (SELECT worker_id FROM workers ORDER BY random() LIMIT 1),
  d.device_id,
  (CURRENT_DATE - ((5 + floor(random()*120))::int) * INTERVAL '1 day')::date,
  CASE WHEN random() < 0.25
       THEN (CURRENT_DATE - ((1 + floor(random()*5))::int) * INTERVAL '1 day')::date
  END
FROM devices d
WHERE NOT EXISTS (
  SELECT 1 FROM worker_device_assignments wda WHERE wda.device_id = d.device_id
);

-- =========================
-- Telemetry & Attendance
-- =========================

-- ~16k sensor readings: 120 devices × 14 days × every 2h
WITH chosen_devices AS (
  SELECT device_id FROM devices ORDER BY random() LIMIT 120
),
t AS (
  SELECT generate_series(
           now() - interval '14 days',
           now(),
           interval '2 hours'
         ) AS ts
)
INSERT INTO sensor_readings(device_id, "timestamp", heart_rate, gas_level, step_count, stationary_time, battery_level)
SELECT
  d.device_id,
  t.ts,
  60 + floor(random()*80)::int,
  round((random()*20)::numeric, 2),
  (100 + floor(random()*10000))::int,
  (floor(random()*360))::int,
  (floor(random()*101))::int
FROM chosen_devices d
CROSS JOIN t
ON CONFLICT DO NOTHING;

-- Sample alternate readings for integration tests
INSERT INTO sensor_readings_alt("timestamp", moisture)
VALUES
  (now() - interval '5 minutes', 42.50),
  (now() - interval '3 minutes', 47.25),
  (now() - interval '1 minute', 44.75)
ON CONFLICT ("timestamp") DO NOTHING;

-- ~4k shifts: 200 workers × last 30 weekdays
WITH w AS (
  SELECT worker_id FROM workers ORDER BY random() LIMIT 200
),
days AS (
  SELECT dd::date AS d
  FROM generate_series(current_date - 30, current_date - 1, interval '1 day') dd
  WHERE EXTRACT(ISODOW FROM dd) <= 5
)
INSERT INTO shift_attendance(worker_id, shift_date, clock_in_time, clock_out_time)
SELECT
  w.worker_id,
  days.d,
  (TIME '08:00' + (floor(random()*120)::int || ' minutes')::interval),
  (TIME '08:00' + (floor(random()*120)::int || ' minutes')::interval) + ((8 + floor(random()*3))::text || ' hours')::interval
FROM w CROSS JOIN days;

-- =========================
-- Health domain
-- =========================

-- ~200 health conditions
INSERT INTO worker_health_conditions(worker_id, condition_name, severity, diagnosis_date, status, notes)
SELECT
  (SELECT worker_id FROM workers ORDER BY random() LIMIT 1),
  _choice(ARRAY['Hypertension','Asthma','Diabetes','Allergy','Back Pain','Migraine']),
  _whc_severity(),
  (CURRENT_DATE - ((30 + floor(random()*720))::int) * INTERVAL '1 day')::date,
  _whc_status(),
  'Auto-generated seed'
FROM generate_series(1,200) gs;

-- ~300 incidents
INSERT INTO worker_health_incidents(worker_id, incident_name, description, severity, incident_date, resolution_date, duration, notes)
SELECT
  (SELECT worker_id FROM workers ORDER BY random() LIMIT 1),
  _choice(ARRAY['High Pulse','Gas Exposure','Fall','Heat Stress','Dehydration']),
  'Auto-generated incident for testing',
  _whc_severity(),
  (CURRENT_DATE - ((1 + floor(random()*180))::int) * INTERVAL '1 day')::date,
  CASE WHEN random() < 0.6
       THEN (CURRENT_DATE - ((0 + floor(random()*90))::int) * INTERVAL '1 day')::date
  END,
  (1 + floor(random()*480))::int,
  'Seed note'
FROM generate_series(1,300) gs;

-- =========================
-- Alerts
-- =========================

-- ~2k alerts
INSERT INTO alerts(worker_id, "timestamp", alert_type, metric_value, threshold_value, resolved_timestamp, is_active)
SELECT
  (SELECT worker_id FROM workers ORDER BY random() LIMIT 1),
  now() - (floor(random()*14*24)::int || ' hours')::interval,
  _alert_type(),
  round((50 + random()*150)::numeric, 2),
  round((40 + random()*100)::numeric, 2),
  CASE WHEN random() < 0.5 THEN now() - (floor(random()*7*24)::int || ' hours')::interval END,
  (random() < 0.5)
FROM generate_series(1,2000) gs;

-- =========================
-- Optional: Refresh Tokens (auto-detect camelCase vs snake_case)
-- =========================

DO $$
DECLARE
  has_camel bool;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name='refresh_tokens' AND column_name='hashedToken'
  ) INTO has_camel;

  IF has_camel THEN
    -- CamelCase quoted identifiers
    EXECUTE $q$
      INSERT INTO refresh_tokens(jti, "hashedToken", user_id, revoked, "replacedBy", "expiresAt", "createdAt")
      SELECT
        md5(random()::text || clock_timestamp()::text),
        md5(random()::text || clock_timestamp()::text),
        u.user_id,
        FALSE,
        NULL,
        now() + interval '30 days',
        now()
      FROM users u
      WHERE random() < 0.5
      LIMIT 60
    $q$;
  ELSE
    -- snake_case
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='refresh_tokens' AND column_name='hashed_token'
    ) THEN
      EXECUTE $q$
        INSERT INTO refresh_tokens(jti, hashed_token, user_id, revoked, replaced_by, expires_at, created_at)
        SELECT
          md5(random()::text || clock_timestamp()::text),
          md5(random()::text || clock_timestamp()::text),
          u.user_id,
          FALSE,
          NULL,
          now() + interval '30 days',
          now()
        FROM users u
        WHERE random() < 0.5
        LIMIT 60
      $q$;
    END IF;
  END IF;
END$$;

COMMIT;

-- Optional: drop helpers if you prefer a clean schema (keep if you'll reseed often)
-- DROP FUNCTION IF EXISTS _choice(text[]) CASCADE;
-- DROP FUNCTION IF EXISTS _fname(int) CASCADE;
-- DROP FUNCTION IF EXISTS _lname(int) CASCADE;
-- DROP FUNCTION IF EXISTS _ec_relation() CASCADE;
-- DROP FUNCTION IF EXISTS _device_status() CASCADE;
-- DROP FUNCTION IF EXISTS _whc_severity() CASCADE;
-- DROP FUNCTION IF EXISTS _whc_status() CASCADE;
-- DROP FUNCTION IF EXISTS _alert_type() CASCADE;
