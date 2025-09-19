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
import SensorReadingAltSchema, {
  SensorReadingAltCreateSchema,
} from "./schemas/SensorReadingAlt";
import AlertExample from "./examples/Alert.json";
import AlertsExample from "./examples/Alerts.json";
import AssignmentExample from "./examples/Assignment.json";
import AssignmentsExample from "./examples/Assignments.json";
import DeviceExample from "./examples/Device.json";
import DevicesExample from "./examples/Devices.json";
import HealthConditionExample from "./examples/HealthCondition.json";
import HealthConditionsExample from "./examples/HealthConditions.json";
import HealthIncidentExample from "./examples/HealthIncident.json";
import HealthIncidentsExample from "./examples/HealthIncidents.json";
import WorkerExample from "./examples/Worker.json";
import WorkersExample from "./examples/Workers.json";
import ShiftAttendanceExample from "./examples/ShiftAttendance.json";
import ShiftAttendancesExample from "./examples/ShiftAttendances.json";
import RoleExample from "./examples/Role.json";
import RolesExample from "./examples/Roles.json";
import PermissionExample from "./examples/Permission.json";
import PermissionsExample from "./examples/Permissions.json";
import SensorReadingExample from "./examples/SensorReading.json";
import SensorReadingsExample from "./examples/SensorReadings.json";
import SensorReadingAltExample from "./examples/SensorReadingAlt.json";
import SensorReadingAltsExample from "./examples/SensorReadingAlts.json";
import SensorReadingAltCreateExample from "./examples/SensorReadingAltCreate.json";

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
        SensorReadingAlt: SensorReadingAltSchema,
        SensorReadingAltCreate: SensorReadingAltCreateSchema,
      },
      examples: {
        Alert: AlertExample,
        Alerts: AlertsExample,
        Assignment: AssignmentExample,
        Assignments: AssignmentsExample,
        Device: DeviceExample,
        Devices: DevicesExample,
        HealthCondition: HealthConditionExample,
        HealthConditions: HealthConditionsExample,
        HealthIncident: HealthIncidentExample,
        HealthIncidents: HealthIncidentsExample,
        Role: RoleExample,
        Roles: RolesExample,
        Permission: PermissionExample,
        Permissions: PermissionsExample,
        Worker: WorkerExample,
        Workers: WorkersExample,
        ShiftAttendance: ShiftAttendanceExample,
        ShiftAttendances: ShiftAttendancesExample,
        SensorReading: SensorReadingExample,
        SensorReadings: SensorReadingsExample,
        SensorReadingAlt: SensorReadingAltExample,
        SensorReadingAlts: SensorReadingAltsExample,
        SensorReadingAltCreate: SensorReadingAltCreateExample,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerConfig;
