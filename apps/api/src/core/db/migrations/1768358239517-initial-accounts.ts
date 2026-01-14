import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialAccounts1768358239517 implements MigrationInterface {
    name = 'InitialAccounts1768358239517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(64) NOT NULL, \`type\` varchar(16) NOT NULL DEFAULT 'PERSONAL', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2db43cdbf7bb862e577b5f540c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account-users\` (\`account_id\` int NOT NULL, \`user_id\` int NOT NULL, \`role\` varchar(16) NOT NULL DEFAULT 'MEMBER', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`account_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(128) NOT NULL, \`username\` varchar(32) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` varchar(16) NOT NULL DEFAULT 'PENDING', \`verified_at\` timestamp NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`account-users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2db43cdbf7bb862e577b5f540c\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
