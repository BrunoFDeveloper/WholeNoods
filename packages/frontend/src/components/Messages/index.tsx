import Threads from './Threads';

function InMessage() {
	return (
		<div className="p-4">
			<div className="flex items-end space-x-4">
				<div className="h-6 p-6 bg-red-400 rounded-full" />
				<div className="bg-gray-100 rounded p-4 prose">
					This is a test for a very long message This is a test for a very long
					message This is a test for a very long message This is a test for a
					very long message This is a test for a very long message
				</div>
			</div>
		</div>
	);
}

function OutMessage() {
	return (
		<div className="p-4">
			<div className="flex justify-end items-end space-x-4">
				<div className="bg-indigo-600 text-white rounded p-4 prose">
					This is a test for a very long message This is a test for a very long
					message This is a test for a very long message This is a test for a
					very long message This is a test for a very long message
				</div>
				<div className="h-6 p-6 bg-red-400 rounded-full" />
			</div>
		</div>
	);
}

export default function Messages() {
	return (
		<div className="flex">
			<div className="w-64 bg-gray-100 border-r border-gray-200 min-h-screen">
				<Threads />
			</div>
			<div className="flex-1">
				<InMessage />
				<OutMessage />
			</div>
		</div>
	);
}
