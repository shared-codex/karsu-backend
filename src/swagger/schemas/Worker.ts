
export const WorkerSchema = {
  type: "object",
  properties: {
    worker_id: { type: "integer" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string", nullable: true },
    emergency_contact_name: { type: "string", nullable: true },
    emergency_contact_phone: { type: "string", nullable: true },
    emergency_contact_relation: { type: "string", nullable: true },
  },
  required: ["worker_id", "first_name", "last_name", "phone"],
};

export default WorkerSchema;
