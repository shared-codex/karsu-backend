import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { WorkerDeviceAssignment } from "./WorkerDeviceAssignment";
import { SensorReading } from "./SensorReading";

@Entity({ name: "devices" })
export class Device {
  @PrimaryColumn({ type: "varchar", length: 50 })
  device_id!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  model!: string;

  @Column({ type: "varchar", length: 20, default: "Available" })
  status!: string; // 'Active','Available','Lost','Retired'

  @OneToMany(() => WorkerDeviceAssignment, assignment => assignment.device)
  assignments!: WorkerDeviceAssignment[];

  @OneToMany(() => SensorReading, reading => reading.device)
  sensorReadings!: SensorReading[];
}
