import { DataSource } from "typeorm";
import { Worker } from "./entities/Worker";
import { Device } from "./entities/Device";
import { WorkerDeviceAssignment } from "./entities/WorkerDeviceAssignment";
import { ShiftAttendance } from "./entities/ShiftAttendance";
import { SensorReading } from "./entities/SensorReading";
import { WorkerHealthCondition } from "./entities/WorkerHealthCondition";
import { WorkerHealthIncident } from "./entities/WorkerHealthIncident";
import { Role } from "./entities/Role";
import { Alert } from "./entities/Alert";
import { Permission } from "./entities/Permission";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_db_username",
  password: "your_db_password",
  database: "your_db_name",
  synchronize: true, // for development; use migrations in production
  logging: false,
  entities: [
    Worker,
    Device,
    WorkerDeviceAssignment,
    ShiftAttendance,
    SensorReading,
    WorkerHealthCondition,
    WorkerHealthIncident,
    Role,
    Alert,
    Permission
  ]
});
