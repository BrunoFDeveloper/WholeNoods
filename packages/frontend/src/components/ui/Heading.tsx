import clsx from 'clsx';

type Props = {
	size?: 'h1' | 'h2' | 'h3';
	children: React.ReactNode;
	className?: string;
};

const SIZE_TO_CLASSES = {
	h1: 'text-6xl',
	h2: 'text-5xl',
	h3: 'text-4xl',
};

export default function Heading({
	size: Size = 'h1',
	children,
	className,
}: Props) {
	return (
		<Size
			className={clsx(
				'font-bold italic text-white',
				SIZE_TO_CLASSES[Size],
				className,
			)}
		>
			{children}
		</Size>
	);
}
