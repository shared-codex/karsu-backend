import { DeviceStatus } from "../../entities/Device";

export const DeviceStatusSchema = {
  type: "string",
  enum: Object.values(DeviceStatus),
};

export const DeviceSchema = {
  type: "object",
  properties: {
    device_id: { type: "string" },
    model: { type: "string", nullable: true },
    status: { $ref: "#/components/schemas/DeviceStatus" },
  },
  required: ["device_id", "status"],
};

export default DeviceSchema;
