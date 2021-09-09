import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('livros', {database: 'default', schema: 'public'})
class Livro {
	@PrimaryGeneratedColumn('uuid')
    id: string;

	@Column()
    nome_livro: string;

	@Column()
    nome_autor: string;

	@Column()
    detalhes: string;

	@Column()
    cadastrador: string;

	@CreateDateColumn()
    data_cadastro: Date;

	@UpdateDateColumn()
    data_update: Date;
}

export default Livro;
