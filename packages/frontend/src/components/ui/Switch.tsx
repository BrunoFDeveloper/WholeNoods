import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import { Checkbox } from 'reakit/Checkbox';

export type Props = {
	name: string;
	label: string;
	checked: boolean;
	onToggle(): void;
};

const SwitchComponent = forwardRef<HTMLButtonElement>(
	(
		{ children, checked, ...props }: ComponentProps<'button'> & Partial<Props>,
		ref,
	) => {
		return (
			<button ref={ref} {...props} type="button" className="focus:outline-none">
				<label className="text-sm font-medium leading-5 text-gray-100 flex items-center justify-between">
					{children}
					<span
						className={clsx(
							'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
							checked ? 'bg-red-400' : 'bg-gray-400',
						)}
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
			</button>
		);
	},
);

export default function Switch({
	label,
	checked,
	onToggle,
	name,
	...props
}: Props) {
	return (
		<Checkbox
			as={SwitchComponent}
			checked={checked}
			onChange={onToggle}
			{...props}
		>
			{label}
		</Checkbox>
	);
}
