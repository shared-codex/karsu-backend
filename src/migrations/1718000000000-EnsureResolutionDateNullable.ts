import { MigrationInterface, QueryRunner } from "typeorm";

export class EnsureResolutionDateNullable1718000000000 implements MigrationInterface {
  name = 'EnsureResolutionDateNullable1718000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "worker_health_incidents" ALTER COLUMN "resolution_date" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "worker_health_incidents" ALTER COLUMN "resolution_date" SET NOT NULL`);
  }
}

