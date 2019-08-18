<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190818183612 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE url DROP FOREIGN KEY FK_F47645AEA76ED395');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, full_name VARCHAR(255) NOT NULL, username VARCHAR(191) NOT NULL, email VARCHAR(191) NOT NULL, password VARCHAR(255) NOT NULL, auth_token VARCHAR(191) NOT NULL, UNIQUE INDEX UNIQ_1483A5E9F85E0677 (username), UNIQUE INDEX UNIQ_1483A5E9E7927C74 (email), UNIQUE INDEX UNIQ_1483A5E99315F04E (auth_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE url DROP FOREIGN KEY FK_F47645AEA76ED395');
        $this->addSql('ALTER TABLE url ADD CONSTRAINT FK_F47645AEA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE url DROP FOREIGN KEY FK_F47645AEA76ED395');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, full_name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, username VARCHAR(191) NOT NULL COLLATE utf8mb4_unicode_ci, email VARCHAR(191) NOT NULL COLLATE utf8mb4_unicode_ci, password VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, auth_token VARCHAR(191) NOT NULL COLLATE utf8mb4_unicode_ci, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_8D93D6499315F04E (auth_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE users');
        $this->addSql('ALTER TABLE url DROP FOREIGN KEY FK_F47645AEA76ED395');
        $this->addSql('ALTER TABLE url ADD CONSTRAINT FK_F47645AEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }
}
