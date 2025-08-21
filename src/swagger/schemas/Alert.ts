import { AlertType } from "../../entities/Alert";

export const AlertTypeSchema = {
  type: "string",
  enum: Object.values(AlertType),
};

export const AlertSchema = {
  type: "object",
  properties: {
    alert_id: { type: "integer" },
    worker_id: { type: "integer" },
    timestamp: { type: "string", format: "date-time" },
    alert_type: { $ref: "#/components/schemas/AlertType" },
    metric_value: { type: "number" },
    threshold_value: { type: "number" },
    resolved_timestamp: { type: "string", format: "date-time", nullable: true },
    is_active: { type: "boolean" },
  },
  required: [
    "alert_id",
    "worker_id",
    "timestamp",
    "alert_type",
    "metric_value",
    "threshold_value",
    "is_active",
  ],
};

export default AlertSchema;
