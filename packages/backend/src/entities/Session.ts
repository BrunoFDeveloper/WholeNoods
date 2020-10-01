import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
	@PrimaryColumn()
	key!: string;

	@Column('jsonb')
	data!: object;

	@Column('timestamp')
	expiration!: Date;
}
