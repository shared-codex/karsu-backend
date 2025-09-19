import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * Standalone sensor readings used for alternative ingestion pipelines.
 * The entity is intentionally isolated so it can be linked to devices or
 * environments in future migrations without impacting the main readings table.
 */
@Entity({ name: "sensor_readings_alt" })
export class SensorReadingAlt {
  /**
   * Timestamp captured when the reading is inserted. Acts as the primary key
   * for the alternate readings table.
   */
  @PrimaryColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  /**
   * Moisture level captured by the device. Stored as a decimal to allow
   * precision for percentage based readings.
   */
  @Column({ type: "decimal", precision: 5, scale: 2 })
  moisture!: number;
}
