-- reset_db.sql — wipes ALL data but keeps schema/enums/migrations
-- Run:
--   psql -U postgres -h localhost -d karsu -f reset_db.sql

DO $$
BEGIN
  -- Truncate with CASCADE to respect FKs; restart serials
  EXECUTE '
    TRUNCATE TABLE
      refresh_tokens,
      role_permissions,
      permissions,
      users,
      alerts,
      worker_health_incidents,
      worker_health_conditions,
      shift_attendance,
      sensor_readings,
      worker_device_assignments,
      devices,
      workers,
      roles
    RESTART IDENTITY CASCADE
  ';
END$$;
