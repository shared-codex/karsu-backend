import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn()
  role_id!: number;

  @Column({ type: "varchar", length: 50 })
  role_name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "int", nullable: true })
  max_pulse!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  max_gas_exposure!: number;

  @Column({ type: "int", nullable: true })
  max_inactivity!: number;

  @ManyToMany(() => Permission, permission => permission.roles, { cascade: true })
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "role_id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "permission_id" }
  })
  permissions!: Permission[];
}
