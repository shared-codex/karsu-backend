import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Worker } from "./Worker";

export enum AlertType {
  HIGH_PULSE = "HIGH_PULSE",
  GAS_EXPOSURE = "GAS_EXPOSURE",
  INACTIVITY = "INACTIVITY",
}

@Entity({ name: "alerts" })
export class Alert {
  @PrimaryGeneratedColumn()
  alert_id!: number;

  @Column({ type: "int" })
  worker_id!: number;

  @Column({ type: "timestamptz" })
  timestamp!: Date;

  @Column({
    type: "enum",
    enum: AlertType,
  })
  alert_type!: AlertType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  metric_value!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  threshold_value!: number;

  @Column({ type: "timestamptz", nullable: true })
  resolved_timestamp!: Date;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @ManyToOne(() => Worker, worker => worker.alerts)
  @JoinColumn({ name: "worker_id" })
  worker!: Worker;
}
