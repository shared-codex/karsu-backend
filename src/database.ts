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
import { User } from "./entities/User";
import { RefreshToken } from "./entities/RefreshToken";
import { config } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
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
    Permission,
    User,
    RefreshToken
  ],
  migrations: ["src/migrations/*.ts"],
  migrationsRun: true
});
