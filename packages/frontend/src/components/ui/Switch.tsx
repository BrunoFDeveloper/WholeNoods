import clsx from 'clsx';

export type Props = {
	name: string;
	label: string;
	checked: boolean;
	onToggle(): void;
} & React.ComponentProps<'span'>;

// TODO: This isn't correctly accessible and I need to fix that before launch:

export default function Switch({
	label,
	checked,
	onToggle,
	name,
	...props
}: Props) {
	return (
		<label className="text-sm font-medium leading-5 text-gray-100 flex items-center justify-between">
			{label}
			<input
				checked={checked}
				type="checkbox"
				name={name}
				onChange={onToggle}
				className="hidden"
			/>
			<span
				role="checkbox"
				tabIndex={0}
				aria-checked="false"
				className={clsx(
					'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
					checked ? 'bg-indigo-600' : 'bg-gray-200',
				)}
				{...props}
			>
				<span
					aria-hidden="true"
					className={clsx(
						'inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200',
						checked ? 'translate-x-5' : 'translate-x-0',
					)}
				/>
			</span>
		</label>
	);
}
