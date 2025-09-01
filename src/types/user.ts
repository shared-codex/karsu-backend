export interface Permission {
  permission_id: number;
  name: string;
  description?: string | null;
}

export interface Role {
  role_id: number;
  role_name: string;
  description?: string | null;
  max_pulse?: number | null;
  max_gas_exposure?: number | null;
  max_inactivity?: number | null;
  permissions: Permission[];
}

export interface User {
  user_id: number;
  email: string;
  password_hash: string;
  token_version: number;
  role_id?: number | null;
  role?: Role | null;
}
