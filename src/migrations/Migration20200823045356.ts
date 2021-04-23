import { MigrationInterface, QueryRunner } from "typeorm";
import { Service } from 'typedi'

@Service()
export class Migration20200823045356 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `INSERT INTO USERS("name", "surname", "age") VALUES ('Paul', 'Peter', 32)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DELETE FROM USERS WHERE USERS.name = 'Paul';`
    );
  }

}