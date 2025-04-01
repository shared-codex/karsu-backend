import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Entity({ name: "permissions" })
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name!: string; // e.g. "READ_WORKERS", "CREATE_WORKER"

  @Column({ type: "text", nullable: true })
  description!: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles!: Role[];
}
