
export const RoleSchema = {
  type: "object",
  properties: {
    role_id: { type: "integer" },
    role_name: { type: "string" },
    description: { type: "string", nullable: true },
    max_pulse: { type: "integer", nullable: true },
    max_gas_exposure: { type: "number", nullable: true },
    max_inactivity: { type: "integer", nullable: true },
  },
  required: ["role_id", "role_name"],
};

export default RoleSchema;
