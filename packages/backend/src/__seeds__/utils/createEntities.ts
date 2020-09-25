import { userInfo } from 'os';
import { Message } from '../../entities/Message';
import { MessageThread } from '../../entities/MessageThread';
import { MessageThreadParticipant } from '../../entities/MessageThreadParticipant';
import { User } from '../../entities/User';

export async function createUser(username: string, extras?: Partial<User>) {
	const existing = await User.findOne({ username });
	if (existing) return existing;

	const user = User.create({
		username,
		email: `${username}@wholenoods.com`,
		name: username,
		...extras,
	});

	await user.setPassword(username);

	return user.save();
}

export async function createParticipant(thread: MessageThread, user: User) {
	return await MessageThreadParticipant.create({
		thread,
		user,
	}).save();
}

export async function createMessage(thread: MessageThread, user: User) {
	return await Message.create({
		text: 'Hello, world! This is a sample message.',
		user,
		thread,
	}).save();
}

export async function createThread(user: User, otherUser: User) {
	const participant = await MessageThreadParticipant.findOne({ user });
	if (participant) {
		return await participant.thread;
	}

	const thread = await MessageThread.create({}).save();

	await createParticipant(thread, user);
	await createParticipant(thread, otherUser);
	await createMessage(thread, user);
	await createMessage(thread, otherUser);

	return thread;
}
