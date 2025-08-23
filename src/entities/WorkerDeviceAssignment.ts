import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Worker } from "./Worker";
import { Device } from "./Device";

@Entity({ name: "worker_device_assignments" })
export class WorkerDeviceAssignment {
  @PrimaryGeneratedColumn()
  assignment_id!: number;

  @Column({ type: "int" })
  worker_id!: number;

  @Column({ type: "varchar", length: 50 })
  device_id!: string;

  @Column({ type: "date" })
  assigned_date!: Date;

  @Column({ type: "date", nullable: true })
  unassigned_date?: Date | null;

  @ManyToOne(() => Worker, worker => worker.assignments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "worker_id" })
  worker!: Worker;

  @ManyToOne(() => Device, device => device.assignments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "device_id" })
  device!: Device;
}
