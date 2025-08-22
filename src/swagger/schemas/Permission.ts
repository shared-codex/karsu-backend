
// OpenAPI schema for Permission entities
export const PermissionSchema = {
  type: "object",
  properties: {
    permission_id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string", nullable: true },
  },
  required: ["permission_id", "name"],
};

export default PermissionSchema;
