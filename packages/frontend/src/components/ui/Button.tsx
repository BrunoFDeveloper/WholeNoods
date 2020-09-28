import clsx from 'clsx';

type Color = 'blue' | 'pink';
export type Props = {
	children: React.ReactNode;
	variant?: 'primary' | 'outlined';
	color?: Color;
} & React.ComponentProps<'button'>;

const VARIANT_TO_CLASSES = {
	primary: (color: Color) =>
		`text-black ${color === 'blue' ? 'bg-teal-200' : 'bg-pink-400'}`,
	outlined: (color: Color) =>
		`border ${
			color === 'blue'
				? 'border-teal-200 text-teal-200'
				: 'border-pink-400 text-pink-400'
		}`,
};

export default function Button({
	children,
	variant = 'primary',
	color = 'blue',
	...props
}: Props) {
	return (
		<button
			className={clsx(
				'transition duration-150 rounded focus:outline-none px-5 py-2 font-semibold',
				VARIANT_TO_CLASSES[variant](color),
				props.disabled && 'bg-opacity-50',
			)}
			{...props}
		>
			{children}
		</button>
	);
}
