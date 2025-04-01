import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkerDeviceAssignment } from "./WorkerDeviceAssignment";
import { ShiftAttendance } from "./ShiftAttendance";
import { WorkerHealthCondition } from "./WorkerHealthCondition";
import { WorkerHealthIncident } from "./WorkerHealthIncident";
import { Alert } from "./Alert";

@Entity({ name: "workers" })
export class Worker {
  @PrimaryGeneratedColumn()
  worker_id: number;

  @Column({ type: "varchar", length: 50 })
  first_name: string;

  @Column({ type: "varchar", length: 50 })
  last_name: string;

  @Column({ type: "varchar", length: 15 })
  phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  emergency_contact_name: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  emergency_contact_phone: string;

  @Column({ type: "varchar", nullable: true })
  emergency_contact_relation: string; // Consider using an enum constraint

  @OneToMany(() => WorkerDeviceAssignment, assignment => assignment.worker)
  assignments: WorkerDeviceAssignment[];

  @OneToMany(() => ShiftAttendance, shift => shift.worker)
  shifts: ShiftAttendance[];

  @OneToMany(() => WorkerHealthCondition, condition => condition.worker)
  healthConditions: WorkerHealthCondition[];

  @OneToMany(() => WorkerHealthIncident, incident => incident.worker)
  healthIncidents: WorkerHealthIncident[];

  @OneToMany(() => Alert, alert => alert.worker)
  alerts: Alert[];
}
