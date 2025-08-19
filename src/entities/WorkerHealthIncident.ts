import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Worker } from "./Worker";
import { SeverityLevel } from "./WorkerHealthCondition"; // Reuse the same enum

@Entity({ name: "worker_health_incidents" })
export class WorkerHealthIncident {
  @PrimaryGeneratedColumn()
  incident_id!: number;

  @Column({ type: "int" })
  worker_id!: number;

  @Column({ type: "varchar", length: 100 })
  incident_name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({
    type: "enum",
    enum: SeverityLevel,
  })
  severity!: SeverityLevel;

  @Column({ type: "date" })
  incident_date!: Date;

  @Column({ type: "date" })
  resolution_date!: Date;

  @Column({ type: "int", nullable: true })
  duration?: number | null;

  @Column({ type: "text", nullable: true })
  notes?: string | null;

  @ManyToOne(() => Worker, worker => worker.healthIncidents)
  @JoinColumn({ name: "worker_id" })
  worker!: Worker;
}
