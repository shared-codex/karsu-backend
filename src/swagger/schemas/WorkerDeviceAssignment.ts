
export const WorkerDeviceAssignmentSchema = {
  type: "object",
  properties: {
    assignment_id: { type: "integer" },
    worker_id: { type: "integer" },
    device_id: { type: "string" },
    assigned_date: { type: "string", format: "date" },
    unassigned_date: { type: "string", format: "date", nullable: true },
  },
  required: ["assignment_id", "worker_id", "device_id", "assigned_date"],
};

export default WorkerDeviceAssignmentSchema;
