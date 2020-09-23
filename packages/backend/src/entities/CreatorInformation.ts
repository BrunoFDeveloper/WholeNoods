import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class CreatorInformation extends ExternalEntity {
	@Column()
	legalName!: string;

	@Column()
	country!: string;

	@Column()
	birthdate!: string;

	@OneToOne(() => User, (user) => user.creatorInformation, { lazy: true })
	@JoinColumn()
	user!: Lazy<User>;

	@Column('int')
	subscriptionPrice!: number;
}
