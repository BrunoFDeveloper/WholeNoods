import clsx from 'clsx';
import GradBar from './GradBar';

type Props = {
	tabs: React.ReactNode[];
	selectedIndex: number;
	onChange(index: number): void;
};

function Tab({
	children,
	selected,
	onClick,
}: {
	children: React.ReactNode;
	selected: boolean;
	onClick(): void;
}) {
	return (
		<button
			className="space-y-1 text-white font-bold focus:outline-none"
			onClick={onClick}
		>
			<div className="p-2 pb-0">{children}</div>
			<GradBar
				size="small"
				className={clsx(
					'transition duration-100',
					selected ? 'opacity-1' : 'opacity-0',
				)}
			/>
		</button>
	);
}

export default function Tabs({ tabs, selectedIndex, onChange }: Props) {
	return (
		<div className="flex space-x-4">
			{tabs.map((tab, index) => (
				<Tab
					key={index}
					selected={index === selectedIndex}
					onClick={() => onChange(index)}
				>
					{tab}
				</Tab>
			))}
		</div>
	);
}
