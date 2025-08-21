import { Options } from "swagger-jsdoc";
import WorkerSchema from "./schemas/Worker";
import DeviceSchema, { DeviceStatusSchema } from "./schemas/Device";
import AlertSchema, { AlertTypeSchema } from "./schemas/Alert";
import RoleSchema from "./schemas/Role";
import PermissionSchema from "./schemas/Permission";
import WorkerDeviceAssignmentSchema from "./schemas/WorkerDeviceAssignment";
import ShiftAttendanceSchema from "./schemas/ShiftAttendance";
import WorkerHealthConditionSchema, {
  SeverityLevelSchema,
  ConditionStatusSchema,
} from "./schemas/WorkerHealthCondition";
import WorkerHealthIncidentSchema from "./schemas/WorkerHealthIncident";
import SensorReadingSchema from "./schemas/SensorReading";

const swaggerConfig: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Karsu API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Worker: WorkerSchema,
        Device: DeviceSchema,
        DeviceStatus: DeviceStatusSchema,
        Alert: AlertSchema,
        AlertType: AlertTypeSchema,
        Role: RoleSchema,
        Permission: PermissionSchema,
        WorkerDeviceAssignment: WorkerDeviceAssignmentSchema,
        ShiftAttendance: ShiftAttendanceSchema,
        WorkerHealthCondition: WorkerHealthConditionSchema,
        SeverityLevel: SeverityLevelSchema,
        ConditionStatus: ConditionStatusSchema,
        WorkerHealthIncident: WorkerHealthIncidentSchema,
        SensorReading: SensorReadingSchema,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerConfig;
