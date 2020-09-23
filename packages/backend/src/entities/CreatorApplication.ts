import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './BaseEntity';
import { User } from './User';

export enum ApplicationStatus {
	PENDING,
	REJECTED,
	ACCEPTED,
}

@Entity()
export class CreatorApplication extends ExternalEntity {
	@ManyToOne(() => User, (user) => user.applications, { lazy: true })
	user!: Lazy<User>;

	@Column({ default: ApplicationStatus.PENDING })
	status!: ApplicationStatus;

	@Column()
	reason?: string;

	async reject(reason: string) {
		this.reason = reason;
		this.status = ApplicationStatus.REJECTED;

		await this.save();
	}

	async approve() {
		this.status = ApplicationStatus.ACCEPTED;

		await this.save();
	}
}
