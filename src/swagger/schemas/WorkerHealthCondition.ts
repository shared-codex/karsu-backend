import { SeverityLevel, ConditionStatus } from "../../entities/WorkerHealthCondition";

export const SeverityLevelSchema = {
  type: "string",
  enum: Object.values(SeverityLevel),
};

export const ConditionStatusSchema = {
  type: "string",
  enum: Object.values(ConditionStatus),
};

export const WorkerHealthConditionSchema = {
  type: "object",
  properties: {
    condition_id: { type: "integer" },
    worker_id: { type: "integer" },
    condition_name: { type: "string" },
    description: { type: "string", nullable: true },
    severity: { $ref: "#/components/schemas/SeverityLevel" },
    diagnosis_date: { type: "string", format: "date" },
    status: { $ref: "#/components/schemas/ConditionStatus" },
    notes: { type: "string", nullable: true },
  },
  required: [
    "condition_id",
    "worker_id",
    "condition_name",
    "severity",
    "diagnosis_date",
    "status",
  ],
};

export default WorkerHealthConditionSchema;
