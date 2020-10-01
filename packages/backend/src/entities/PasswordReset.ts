import {
	Entity,
	OneToOne,
	JoinColumn,
	AfterInsert,
} from 'typeorm';
import { User } from './User';
import { InternalEntity } from './utils/Base';

@Entity()
export class PasswordReset extends InternalEntity {
	static async createForEmail(email: string) {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			throw new Error('Unknown user for password reset');
		}

		const previousReset = await this.findOne({ where: { user } });

		if (previousReset) {
			await this.remove(previousReset);
		}

		const passwordReset = this.create({ user });
		await passwordReset.save();
	}

	static async removeForUser(user: User) {
		await this.delete({ user });
	}

	@OneToOne(() => User)
	@JoinColumn()
	user!: User;

	@AfterInsert()
	sendEmail() {
		// TODO: Send a password reset email.
	}
}
