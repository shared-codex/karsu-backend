import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { WorkerDeviceAssignment } from "./WorkerDeviceAssignment";
import { SensorReading } from "./SensorReading";

export enum DeviceStatus {
  Active = "Active",
  Available = "Available",
  Lost = "Lost",
  Retired = "Retired",
}

@Entity({ name: "devices" })
export class Device {
  @PrimaryColumn({ type: "varchar", length: 50 })
  device_id!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  model?: string | null;

  @Column({ type: "enum", enum: DeviceStatus, default: DeviceStatus.Available })
  status!: DeviceStatus;

  @OneToMany(() => WorkerDeviceAssignment, assignment => assignment.device)
  assignments!: WorkerDeviceAssignment[];

  @OneToMany(() => SensorReading, reading => reading.device)
  sensorReadings!: SensorReading[];
}
