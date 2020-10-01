import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
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
			<div className="p-2">{children}</div>
		</button>
	);
}

export default function Tabs({ tabs, selectedIndex, onChange }: Props) {
	const tabsRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState({ width: 0, left: 0 });

	function updateGradBar(el: HTMLElement) {
		setState({
			left: el.offsetLeft,
			width: el.offsetWidth,
		});
	}

	useEffect(() => {
		if (!tabsRef.current) return;

		const tab = tabsRef.current.children[selectedIndex] as HTMLElement;
		setState({
			left: tab.offsetLeft,
			width: tab.offsetWidth,
		});
	}, [selectedIndex]);

	return (
		<div className="relative">
			<div className="flex space-x-4" ref={tabsRef}>
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
			<GradBar
				size="small"
				className="absolute transition-all duration-150"
				style={state}
			/>
		</div>
	);
}
