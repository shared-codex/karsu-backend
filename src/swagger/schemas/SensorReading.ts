
export const SensorReadingSchema = {
  type: "object",
  properties: {
    device_id: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    heart_rate: { type: "integer" },
    gas_level: { type: "number" },
    step_count: { type: "integer" },
    stationary_time: { type: "integer" },
    battery_level: { type: "integer" },
  },
  required: [
    "device_id",
    "timestamp",
    "heart_rate",
    "gas_level",
    "step_count",
    "stationary_time",
    "battery_level",
  ],
};

export default SensorReadingSchema;
