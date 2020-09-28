import clsx from 'clsx';

type Props = {
	color: 'blue' | 'pink';
	children: React.ReactNode;
};

const COLOR_TO_CLASSES = {
	blue: 'bg-teal-200 text-teal-900',
	pink: 'bg-pink-400 text-pink-900',
};

export default function Badge({ color, children }: Props) {
	return (
		<div
			className={clsx(
				'rounded-sm  px-1.5 py-1 text-xs leading-3 font-normal',
				COLOR_TO_CLASSES[color],
			)}
		>
			{children}
		</div>
	);
}
