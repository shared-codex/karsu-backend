import { MigrationInterface, QueryRunner } from "typeorm";

export class EnsureResolutionDateNullable1718000000000 implements MigrationInterface {
  name = 'EnsureResolutionDateNullable1718000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema='public' AND table_name='worker_health_incidents'
  ) THEN
    ALTER TABLE "worker_health_incidents" ALTER COLUMN "resolution_date" DROP NOT NULL;
  END IF;
END$$;`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "worker_health_incidents" ALTER COLUMN "resolution_date" SET NOT NULL`);
  }
}

