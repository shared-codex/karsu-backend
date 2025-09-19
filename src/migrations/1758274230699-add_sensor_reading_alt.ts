import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSensorReadingAlt1758274230699 implements MigrationInterface {
  name = "AddSensorReadingAlt1758274230699";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "sensor_readings_alt" (
        "timestamp" TIMESTAMPTZ PRIMARY KEY DEFAULT now(),
        "moisture" NUMERIC(5, 2) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "sensor_readings_alt"`);
  }
}
