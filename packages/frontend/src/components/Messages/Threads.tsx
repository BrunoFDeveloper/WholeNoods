import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { ThreadsQuery } from './__generated__/ThreadsQuery.graphql';
import Thread from './Thread';

export default function Threads() {
	const data = useLazyLoadQuery<ThreadsQuery>(
		graphql`
			query ThreadsQuery {
				messageThreads {
					id
					...Thread_messageThread
				}
			}
		`,
		{},
	);

	return (
		<div className="divide-y">
			{data.messageThreads.map((thread) => (
				<Thread thread={thread} />
			))}
		</div>
	);
}
