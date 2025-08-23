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
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "your_db_username",
  password: process.env.DB_PASSWORD || "your_db_password",
  database: process.env.DB_DATABASE || "your_db_name",
  synchronize: false,
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
  ],
  migrations: ["src/migrations/*.ts"],
  migrationsRun: true
});
