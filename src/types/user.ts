export interface Permission {
  name: string;
}

export interface Role {
  permissions: Permission[];
}

export interface User {
  role: Role;
}
