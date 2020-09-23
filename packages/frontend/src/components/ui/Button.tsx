import clsx from "clsx";

export type Props = {
	children: React.ReactNode;
} & React.ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
	return (
		<button
			className={clsx(
				'text-white bg-green-600 bg-transparent transition duration-150 rounded focus:outline-none px-5 py-2 text-lg font-semibold',
				props.disabled && 'bg-opacity-50',
			)}
			{...props}
		>
			{children}
		</button>
	);
}
