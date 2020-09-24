type Props = {
	text: string;
};

export default function OutMessage({ text }: Props) {
	return (
		<div className="p-4">
			<div className="flex justify-end items-end space-x-4">
				<div className="bg-indigo-600 text-white rounded p-4 prose">
					{text}
				</div>
				<div className="h-6 p-6 bg-red-400 rounded-full" />
			</div>
		</div>
	);
}
