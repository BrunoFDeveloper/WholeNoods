import { graphql, useMutation } from 'react-relay/hooks';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useParams } from 'react-router-dom';
import { ComposerMutation } from './__generated__/ComposerMutation.graphql';
import { useRef, useState } from 'react';

export default function Composer() {
	const params = useParams();
	const inputRef = useRef<HTMLInputElement>(null);
	const [text, setText] = useState('');
	const [commit, isInFlight] = useMutation<ComposerMutation>(graphql`
		mutation ComposerMutation($input: SendMessageInput!) {
			sendMessage(input: $input) {
				id
				...Message_message
			}
		}
	`);

	function sendMessage(e: React.FormEvent) {
		e.preventDefault();

		commit({
			variables: {
				input: {
					messageThreadId: params.id,
					text: text,
				},
			},
			onCompleted() {
				setText('');
				inputRef.current?.focus();
			},
		});
	}

	return (
		<div className="bg-gray-900 border-gray-800 border-t p-4">
			<form onSubmit={sendMessage} className="flex items-end space-x-4">
				<div className="flex-1">
					<Input
						ref={inputRef}
						label="New Message"
						name="message"
						disabled={isInFlight}
						value={text}
						onChange={(e) => setText(e.target.value)}
						autoComplete="off"
					/>
				</div>
				<Button disabled={isInFlight}>Send</Button>
			</form>
		</div>
	);
}
