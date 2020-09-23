import clsx from 'clsx';
import { forwardRef } from 'react';

export type Props = {
	label: string;
} & React.ComponentProps<'input'>;

export default forwardRef<HTMLInputElement, Props>(
	({ label, ...props }, ref) => {
		return (
			<label className="block text-sm font-medium leading-5 text-gray-700">
				{label}
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						className={clsx(
							'form-input block w-full sm:text-sm sm:leading-5',
							props.disabled && 'bg-gray-100',
						)}
						ref={ref}
						{...props}
					/>
				</div>
			</label>
		);
	},
);
