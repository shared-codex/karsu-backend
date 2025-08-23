import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Device } from "./Device";

@Entity({ name: "sensor_readings" })
export class SensorReading {
  @PrimaryColumn({ type: "varchar", length: 50 })
  device_id!: string;

  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @Column({ type: "int" })
  heart_rate!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  gas_level!: number;

  @Column({ type: "int" })
  step_count!: number;

  @Column({ type: "int" })
  stationary_time!: number;

  @Column({ type: "smallint" })
  battery_level!: number;

  @ManyToOne(() => Device, device => device.sensorReadings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "device_id" })
  device!: Device;
}
