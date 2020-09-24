import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { ThreadsQuery } from './__generated__/ThreadsQuery.graphql';
import Thread from './Thread';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Threads() {
	const navigate = useNavigate();
	const params = useParams();
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

	useEffect(() => {
		const [firstMessageThread] = data.messageThreads;
		if (!params.id && firstMessageThread) {
			navigate(firstMessageThread.id);
		}
	}, [params.id]);

	if (!params.id) {
	}

	return (
		<div className="divide-y">
			{data.messageThreads.map((thread) => (
				<Thread
					key={thread.id}
					selected={thread.id === params.id}
					thread={thread}
				/>
			))}
		</div>
	);
}
