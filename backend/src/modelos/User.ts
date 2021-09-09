import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users', {database: 'default', schema: 'public'})
class User {
	@PrimaryGeneratedColumn('uuid')
    id: string;

	@Column()
    user_name: string;

	@Column()
    @Exclude()
    user_password: string;

	@CreateDateColumn()
    created_at: Date;

	@UpdateDateColumn()
    updated_at: Date;
}

export default User;
