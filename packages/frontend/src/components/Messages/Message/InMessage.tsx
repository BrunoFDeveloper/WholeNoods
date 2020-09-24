type Props = {
	text: string;
};

export default function InMessage({ text }: Props) {
	return (
		<div className="p-4">
			<div className="flex items-end space-x-4">
				<div className="h-6 p-6 bg-red-400 rounded-full" />
				<div className="bg-gray-100 rounded p-4 prose">
					{text}
				</div>
			</div>
		</div>
	);
}
