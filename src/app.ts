import express from "express";
import workerRoutes from "./routes/worker.routes";
// Import other routes similarly:
import deviceRoutes from "./routes/device.routes";
import assignmentRoutes from "./routes/assignment.routes";
import shiftRoutes from "./routes/shift.routes";
import sensorReadingRoutes from "./routes/sensorReading.routes";
import healthConditionRoutes from "./routes/healthCondition.routes";
import healthIncidentRoutes from "./routes/healthIncident.routes";
import roleRoutes from "./routes/role.routes";
import alertRoutes from "./routes/alert.routes";
import { swaggerServe, swaggerSetup } from "./swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerServe, swaggerSetup);

app.use("/api/workers", workerRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/sensor-readings", sensorReadingRoutes);
app.use("/api/health-conditions", healthConditionRoutes);
app.use("/api/health-incidents", healthIncidentRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/alerts", alertRoutes);

export default app;
