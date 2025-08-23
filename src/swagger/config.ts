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
import AlertExample from "./examples/Alert.json";
import AlertsExample from "./examples/Alerts.json";
import AssignmentExample from "./examples/Assignment.json";
import AssignmentsExample from "./examples/Assignments.json";
import HealthConditionExample from "./examples/HealthCondition.json";
import HealthConditionsExample from "./examples/HealthConditions.json";

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
      examples: {
        Alert: AlertExample,
        Alerts: AlertsExample,
        Assignment: AssignmentExample,
        Assignments: AssignmentsExample,
        HealthCondition: HealthConditionExample,
        HealthConditions: HealthConditionsExample,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerConfig;
