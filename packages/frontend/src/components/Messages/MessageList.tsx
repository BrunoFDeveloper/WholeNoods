import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import { MessageListQuery } from './__generated__/MessageListQuery.graphql';
import Message from './Message';

export default function MessageList() {
	const params = useParams();

	const data = useLazyLoadQuery<MessageListQuery>(
		graphql`
			query MessageListQuery($id: ID!) {
				messageThread(id: $id) {
					id
					messages {
						id
						...Message_message
					}
				}
			}
		`,
		{
			id: params.id,
		},
	);

	return (
		<div className="overflow-y-auto flex-1 bg-black">
			{data.messageThread.messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
}
