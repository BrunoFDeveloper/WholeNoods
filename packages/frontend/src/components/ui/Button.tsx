import clsx from 'clsx';

export type Props = {
	children: React.ReactNode;
} & React.ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
	return (
		<button
			className={clsx(
				'text-black bg-teal-200 bg-transparent transition duration-150 rounded focus:outline-none px-5 py-2 font-semibold',
				props.disabled && 'bg-opacity-50',
			)}
			{...props}
		>
			{children}
		</button>
	);
}
