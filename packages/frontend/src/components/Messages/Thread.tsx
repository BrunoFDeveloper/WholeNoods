import clsx from 'clsx';
import { graphql, useFragment } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import { Thread_messageThread$key } from './__generated__/Thread_messageThread.graphql';

type Props = {
	selected: boolean;
	thread: Thread_messageThread$key;
};

export default function Thread({ thread, selected }: Props) {
	const data = useFragment(
		graphql`
			fragment Thread_messageThread on MessageThread {
				id
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
		<Link
			to={`/messages/${data.id}`}
			className={clsx(
				'px-4 py-3 flex items-center space-x-4 border-gray-900 text-left w-full focus:outline-none',
				selected ? 'bg-gray-800' : 'hover:bg-gray-700',
			)}
		>
			<div className="h-6 p-6 bg-red-400 rounded-full" />
			<div className="overflow-hidden">
				<div className="font-semibold text-gray-100">
					{data.participants[0].user.name}
				</div>
				<div className="text-xs truncate mt-0.5 text-gray-200">
					{data.lastMessage?.text}
				</div>
			</div>
		</Link>
	);
}
