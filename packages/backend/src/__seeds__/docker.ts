import { createConnection } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageThread } from '../entities/MessageThread';
import { MessageThreadParticipant } from '../entities/MessageThreadParticipant';
import { User, UserType } from '../entities/User';

async function main() {
	await createConnection(require('../../ormconfig.js'));

	let user = await User.findOne({
		where: { email: 'admin@vapejuicejordan.rip' },
	});

	if (!user) {
		const user = User.create({
			email: 'admin@vapejuicejordan.rip',
			displayName: 'Jordan',
			legalName: 'Jordan Gensler',
			bio: 'I created this site, what else do you want to know?',
			type: UserType.CREATOR,
		});

		await user.setPassword('admin');

		await user.save();
	}

	let thread = await MessageThread.findOne({});
	if (!thread) {
		thread = MessageThread.create({});
		await thread.save();
		const participant = MessageThreadParticipant.create({
			user,
			thread,
		});
		await participant.save();
	}

	let message = await Message.findOne({
		where: { thread },
	});
	if (!message) {
		message = Message.create({
			thread,
			user,
			text: 'Hello, world!',
		});
		await message.save();
	}
}

main();
