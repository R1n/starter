import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration20200822141024 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE TABLE USERS (
                id SERIAL NOT NULL PRIMARY KEY,
                name VARCHAR(50),
                surname VARCHAR(50),
                age VARCHAR(100),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW ()
                );`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DROP TABLE USERS;`
    );
  }

}