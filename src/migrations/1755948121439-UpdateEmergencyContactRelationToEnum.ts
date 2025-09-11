import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmergencyContactRelationToEnum1755948121439 implements MigrationInterface {
  name = 'UpdateEmergencyContactRelationToEnum1755948121439'

  public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
        WHERE t.typname='workers_emergency_contact_relation_enum' AND n.nspname='public'
      ) THEN
        CREATE TYPE "public"."workers_emergency_contact_relation_enum"
          AS ENUM('Parent','Spouse','Sibling','Friend');
      END IF;
    END$$;
  `);

  await queryRunner.query(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='workers' AND column_name='emergency_contact_relation'
      ) THEN
        ALTER TABLE "public"."workers"
          ALTER COLUMN "emergency_contact_relation"
          TYPE "public"."workers_emergency_contact_relation_enum"
          USING "emergency_contact_relation"::"public"."workers_emergency_contact_relation_enum";
      END IF;
    END$$;
  `);
}


  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "emergency_contact_relation" TYPE varchar`);
    await queryRunner.query(`DROP TYPE "public"."workers_emergency_contact_relation_enum"`);
  }
}
