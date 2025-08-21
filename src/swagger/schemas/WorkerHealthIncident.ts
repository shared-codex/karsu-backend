
export const WorkerHealthIncidentSchema = {
  type: "object",
  properties: {
    incident_id: { type: "integer" },
    worker_id: { type: "integer" },
    incident_name: { type: "string" },
    description: { type: "string" },
    severity: { $ref: "#/components/schemas/SeverityLevel" },
    incident_date: { type: "string", format: "date" },
    resolution_date: { type: "string", format: "date", nullable: true },
    duration: { type: "integer", nullable: true },
    notes: { type: "string", nullable: true },
  },
  required: [
    "incident_id",
    "worker_id",
    "incident_name",
    "description",
    "severity",
    "incident_date",
  ],
};

export default WorkerHealthIncidentSchema;
