import { Routes, Route, useParams } from 'react-router-dom';
import MessageList from './MessageList';
import Threads from './Threads';
import Composer from './Composer';

function MessagesLayout() {
	const params = useParams();

	return (
		<div className="flex flex-1 overflow-hidden container mx-auto">
			<div className="w-64 bg-gray-900 border-gray-800 border-r">
				<Threads />
			</div>
			<div className="flex-1 flex flex-col">
				{params.id && (
					<>
						<MessageList />
						<Composer />
					</>
				)}
			</div>
		</div>
	);
}

export default function Messages() {
	return (
		<Routes>
			<Route path=":id" element={<MessagesLayout />} />
			<Route path="/" element={<MessagesLayout />} />
		</Routes>
	);
}
