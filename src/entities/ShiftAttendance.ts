import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Worker } from "./Worker";

@Entity({ name: "shift_attendance" })
export class ShiftAttendance {
  @PrimaryGeneratedColumn()
  attendance_id!: number;

  @Column({ type: "int" })
  worker_id!: number;

  @Column({ type: "date" })
  shift_date!: Date;

  @Column({ type: "time" })
  clock_in_time!: string;

  @Column({ type: "time", nullable: true })
  clock_out_time?: string | null;

  @ManyToOne(() => Worker, worker => worker.shifts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "worker_id" })
  worker!: Worker;
}
