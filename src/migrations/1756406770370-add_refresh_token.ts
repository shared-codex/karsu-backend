import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshToken1756406770370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "jti" character varying NOT NULL,
        "hashed_token" character varying(255) NOT NULL,
        "revoked" boolean NOT NULL DEFAULT false,
        "replaced_by" character varying,
        "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "user_id" integer,
        CONSTRAINT "PK_refresh_tokens_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_refresh_tokens_jti" ON "refresh_tokens" ("jti")`);
    await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_tokens_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_refresh_tokens_jti"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
