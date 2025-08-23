import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmergencyContactRelationToEnum1755948121439 implements MigrationInterface {
  name = 'UpdateEmergencyContactRelationToEnum1755948121439'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."workers_emergency_contact_relation_enum" AS ENUM('Parent', 'Spouse', 'Sibling', 'Friend')`);
    await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "emergency_contact_relation" TYPE "public"."workers_emergency_contact_relation_enum" USING "emergency_contact_relation"::"public"."workers_emergency_contact_relation_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "emergency_contact_relation" TYPE varchar`);
    await queryRunner.query(`DROP TYPE "public"."workers_emergency_contact_relation_enum"`);
  }
}
