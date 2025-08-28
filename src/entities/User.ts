import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./Role";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password_hash!: string;

  @Column({ type: "int", default: 0 })
  token_version!: number;

  @Column({ type: "int", nullable: true })
  role_id?: number | null;

  @ManyToOne(() => Role, { onDelete: "SET NULL" })
  @JoinColumn({ name: "role_id" })
  role?: Role | null;
}

