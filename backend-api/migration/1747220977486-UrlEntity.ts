import { MigrationInterface, QueryRunner } from 'typeorm';

export class UrlEntity1747220977486 implements MigrationInterface {
  name = 'UrlEntity1747220977486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "entity_url" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "shortUrlId" character varying(8) NOT NULL, "shortUrl" character varying(255), "clicks" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a71511acc2e9f24bc6f06ee2323" UNIQUE ("shortUrlId"), CONSTRAINT "PK_928f2160236448c7ccd4af7896d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "entity_url"`);
  }
}
