
export const ShiftAttendanceSchema = {
  type: "object",
  properties: {
    attendance_id: { type: "integer" },
    worker_id: { type: "integer" },
    shift_date: { type: "string", format: "date" },
    clock_in_time: { type: "string", format: "time" },
    clock_out_time: { type: "string", format: "time", nullable: true },
  },
  required: ["attendance_id", "worker_id", "shift_date", "clock_in_time"],
};

export default ShiftAttendanceSchema;
