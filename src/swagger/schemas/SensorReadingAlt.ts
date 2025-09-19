export const SensorReadingAltSchema = {
  type: "object",
  properties: {
    timestamp: { type: "string", format: "date-time" },
    moisture: { type: "number" },
  },
  required: ["timestamp", "moisture"],
};

export const SensorReadingAltCreateSchema = {
  type: "object",
  properties: {
    value: { type: "number" },
  },
  required: ["value"],
};

export default SensorReadingAltSchema;
