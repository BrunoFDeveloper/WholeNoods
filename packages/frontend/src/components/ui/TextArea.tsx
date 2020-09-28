import { forwardRef } from 'react';
import clsx from 'clsx';
import GradBar from './GradBar';

type Props = { label: string } & React.ComponentProps<'textarea'>;

export default forwardRef<HTMLTextAreaElement, Props>(
	({ label, ...props }, ref) => {
		return (
			<label className="block text-sm font-medium leading-5 text-gray-100">
				{label}
				<textarea
					className={clsx(
						'form-textarea block w-full sm:text-sm sm:leading-5 rounded rounded-b-none border-0 text-gray-900',
						props.disabled && 'bg-gray-100',
					)}
					ref={ref}
					{...props}
				/>
				<GradBar />
			</label>
		);
	},
);
