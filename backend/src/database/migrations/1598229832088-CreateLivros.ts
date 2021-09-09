import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLivros1598229832088 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "livros",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'nome_livro',
                        type: 'varchar',
                        isNullable: true,
                        isUnique: true
                    },
                    {
                        name: 'nome_autor',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'detalhes',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cadastrador',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'data_cadastro',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'data_update',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
  	    await queryRunner.dropTable('livros');
	}
}
