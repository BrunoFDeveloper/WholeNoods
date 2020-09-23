import { graphql, useFragment } from 'react-relay/hooks';
import { Thread_messageThread$key } from './__generated__/Thread_messageThread.graphql';

type Props = {
	thread: Thread_messageThread$key;
};

export default function Thread({ thread }: Props) {
	const data = useFragment(
		graphql`
			fragment Thread_messageThread on MessageThread {
				participants {
					user {
						id
						name
					}
				}
				lastMessage {
					id
					text
				}
			}
		`,
		thread,
	);

	return (
		<button className="px-4 py-3 flex items-center space-x-4 border-gray-200 hover:bg-white text-left w-full focus:outline-none">
			<div className="h-6 p-6 bg-red-400 rounded-full" />
			<div className="overflow-hidden">
				<div className="font-semibold">
					{data.participants[0].user.name}
				</div>
				<div className="text-xs truncate mt-0.5">{data.lastMessage?.text}</div>
			</div>
		</button>
	);
}
