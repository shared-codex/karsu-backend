import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1756406403527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "user_id" SERIAL NOT NULL,
        "email" character varying(100) NOT NULL,
        "password_hash" character varying(255) NOT NULL,
        "token_version" integer NOT NULL DEFAULT 0,
        "role_id" integer,
        CONSTRAINT "PK_users_user_id" PRIMARY KEY ("user_id")
      )
    `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_users_email" ON "users" ("email")`);
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_role_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
