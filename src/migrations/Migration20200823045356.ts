import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration20200823045356 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `INSERT INTO USERS("id", "name", "surname", "age") VALUES (1, 'Paul', 'Peter', 32)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DELETE FROM USERS WHERE USERS.id = 1;`
    );
  }

}