import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Worker } from "./Worker";

export enum SeverityLevel {
  Mild = "Mild",
  Moderate = "Moderate",
  Severe = "Severe",
}

export enum ConditionStatus {
  Active = "Active",
  Managed = "Managed",
  Stable = "Stable",
}

@Entity({ name: "worker_health_conditions" })
export class WorkerHealthCondition {
  @PrimaryGeneratedColumn()
  condition_id!: number;

  @Column({ type: "int" })
  worker_id!: number;

  @Column({ type: "varchar", length: 100 })
  condition_name!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({
    type: "enum",
    enum: SeverityLevel,
  })
  severity!: SeverityLevel;

  @Column({ type: "date" })
  diagnosis_date!: Date;

  @Column({
    type: "enum",
    enum: ConditionStatus,
  })
  status!: ConditionStatus;

  @Column({ type: "text", nullable: true })
  notes?: string | null;

  @ManyToOne(() => Worker, worker => worker.healthConditions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "worker_id" })
  worker!: Worker;
}
