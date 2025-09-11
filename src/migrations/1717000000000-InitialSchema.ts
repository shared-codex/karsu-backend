import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1717000000000 implements MigrationInterface {
  name = 'InitialSchema1717000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Extensions
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Enums needed now (we intentionally DO NOT create the workers_emergency_contact_relation_enum here,
    // because a later migration in your repo creates it and converts the column to enum).
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'devices_status_enum') THEN
          CREATE TYPE "public"."devices_status_enum" AS ENUM ('Active','Available','Lost','Retired');
        END IF;
      END$$;`);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'worker_health_conditions_severity_enum') THEN
          CREATE TYPE "public"."worker_health_conditions_severity_enum" AS ENUM ('Mild','Moderate','Severe');
        END IF;
      END$$;`);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'worker_health_conditions_status_enum') THEN
          CREATE TYPE "public"."worker_health_conditions_status_enum" AS ENUM ('Active','Managed','Stable');
        END IF;
      END$$;`);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alerts_alert_type_enum') THEN
          CREATE TYPE "public"."alerts_alert_type_enum" AS ENUM ('HIGH_PULSE','GAS_EXPOSURE','INACTIVITY');
        END IF;
      END$$;`);

    // ---------- Tables ----------
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workers" (
        "worker_id" SERIAL PRIMARY KEY,
        "first_name" VARCHAR(100) NOT NULL,
        "last_name"  VARCHAR(100) NOT NULL,
        "phone"      VARCHAR(20)  NOT NULL,
        "email"      VARCHAR(100),
        "emergency_contact_name"  VARCHAR(100),
        "emergency_contact_phone" VARCHAR(20),
        -- initially varchar; a later migration in your repo converts it to ENUM
        "emergency_contact_relation" VARCHAR
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "devices" (
        "device_id" VARCHAR(50) PRIMARY KEY,
        "model"     VARCHAR(50),
        "status"    "public"."devices_status_enum" NOT NULL DEFAULT 'Available'
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "worker_device_assignments" (
        "assignment_id" SERIAL PRIMARY KEY,
        "worker_id" INT NOT NULL,
        "device_id" VARCHAR(50) NOT NULL,
        "assigned_date" DATE NOT NULL,
        "unassigned_date" DATE,
        CONSTRAINT "FK_wda_worker" FOREIGN KEY ("worker_id") REFERENCES "workers" ("worker_id") ON DELETE CASCADE,
        CONSTRAINT "FK_wda_device" FOREIGN KEY ("device_id") REFERENCES "devices" ("device_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "sensor_readings" (
        "device_id" VARCHAR(50) NOT NULL,
        "timestamp" TIMESTAMPTZ NOT NULL,
        "heart_rate" INT NOT NULL,
        "gas_level" DECIMAL(5,2) NOT NULL,
        "step_count" INT NOT NULL,
        "stationary_time" INT NOT NULL,
        "battery_level" SMALLINT NOT NULL,
        CONSTRAINT "PK_sensor_readings" PRIMARY KEY ("device_id","timestamp"),
        CONSTRAINT "FK_sr_device" FOREIGN KEY ("device_id") REFERENCES "devices" ("device_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "shift_attendance" (
        "attendance_id" SERIAL PRIMARY KEY,
        "worker_id" INT NOT NULL,
        "shift_date" DATE NOT NULL,
        "clock_in_time" TIME NOT NULL,
        "clock_out_time" TIME,
        CONSTRAINT "FK_sa_worker" FOREIGN KEY ("worker_id") REFERENCES "workers" ("worker_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "worker_health_conditions" (
        "condition_id" SERIAL PRIMARY KEY,
        "worker_id" INT NOT NULL,
        "condition_name" VARCHAR(100) NOT NULL,
        "severity" "public"."worker_health_conditions_severity_enum" NOT NULL,
        "diagnosis_date" DATE NOT NULL,
        "status" "public"."worker_health_conditions_status_enum" NOT NULL,
        "notes" TEXT,
        CONSTRAINT "FK_whc_worker" FOREIGN KEY ("worker_id") REFERENCES "workers" ("worker_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "worker_health_incidents" (
        "incident_id" SERIAL PRIMARY KEY,
        "worker_id" INT NOT NULL,
        "incident_name" VARCHAR(100) NOT NULL,
        "description" TEXT NOT NULL,
        "severity" "public"."worker_health_conditions_severity_enum" NOT NULL,
        "incident_date" DATE NOT NULL,
        "resolution_date" DATE,
        "duration" INT,
        "notes" TEXT,
        CONSTRAINT "FK_whi_worker" FOREIGN KEY ("worker_id") REFERENCES "workers" ("worker_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "alerts" (
        "alert_id" SERIAL PRIMARY KEY,
        "worker_id" INT NOT NULL,
        "timestamp" TIMESTAMPTZ NOT NULL,
        "alert_type" "public"."alerts_alert_type_enum" NOT NULL,
        "metric_value" DECIMAL(10,2) NOT NULL,
        "threshold_value" DECIMAL(10,2) NOT NULL,
        "resolved_timestamp" TIMESTAMPTZ,
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "FK_alert_worker" FOREIGN KEY ("worker_id") REFERENCES "workers" ("worker_id") ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "roles" (
        "role_id" SERIAL PRIMARY KEY,
        "role_name" VARCHAR(50) NOT NULL,
        "description" TEXT,
        "max_pulse" INT,
        "max_gas_exposure" DECIMAL(5,2),
        "max_inactivity" INT
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "permissions" (
        "permission_id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL UNIQUE,
        "description" TEXT
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "role_permissions" (
        "role_id" INT NOT NULL,
        "permission_id" INT NOT NULL,
        CONSTRAINT "PK_role_permissions" PRIMARY KEY ("role_id","permission_id"),
        CONSTRAINT "FK_rp_role" FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id") ON DELETE CASCADE,
        CONSTRAINT "FK_rp_perm" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("permission_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "role_permissions"');
    await queryRunner.query('DROP TABLE IF EXISTS "permissions"');
    await queryRunner.query('DROP TABLE IF EXISTS "roles"');
    await queryRunner.query('DROP TABLE IF EXISTS "alerts"');
    await queryRunner.query('DROP TABLE IF EXISTS "worker_health_incidents"');
    await queryRunner.query('DROP TABLE IF EXISTS "worker_health_conditions"');
    await queryRunner.query('DROP TABLE IF EXISTS "shift_attendance"');
    await queryRunner.query('DROP TABLE IF EXISTS "sensor_readings"');
    await queryRunner.query('DROP TABLE IF EXISTS "worker_device_assignments"');
    await queryRunner.query('DROP TABLE IF EXISTS "devices"');
    await queryRunner.query('DROP TABLE IF EXISTS "workers"');
    await queryRunner.query('DROP TYPE IF EXISTS "public"."alerts_alert_type_enum"');
    await queryRunner.query('DROP TYPE IF EXISTS "public"."worker_health_conditions_status_enum"');
    await queryRunner.query('DROP TYPE IF EXISTS "public"."worker_health_conditions_severity_enum"');
    await queryRunner.query('DROP TYPE IF EXISTS "public"."devices_status_enum"');
  }
}
