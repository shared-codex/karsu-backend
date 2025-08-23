import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexToRolesRoleName1755935795340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_roles_role_name" ON "roles" ("role_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_roles_role_name"`);
    }

}
