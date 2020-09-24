import { graphql, useFragment } from 'react-relay/hooks';
import { Message_message$key } from './__generated__/Message_message.graphql';
import InMessage from './InMessage';
import OutMessage from './OutMessage';

type Props = {
	message: Message_message$key;
};

export default function Message({ message }: Props) {
	const data = useFragment(
		graphql`
			fragment Message_message on Message {
				text
				fromViewer
				user {
					id
					name
				}
			}
		`,
		message,
	);

	return data.fromViewer ? <OutMessage text={data.text} /> : <InMessage text={data.text} />;
}
