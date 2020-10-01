import clsx from 'clsx';
import { ComponentProps } from 'react';

type Props = {
	color?: 'blue' | 'pink';
	size?: 'small' | 'medium';
} & ComponentProps<'div'>;

const COLOR_TO_CLASSNAMES = {
	blue: 'from-indigo-500 to-teal-200 bg-teal-200',
	pink: 'from-purple-400 to-pink-400 bg-pink-400',
};

const SIZE_TO_CLASSNAMES = {
	small: 'h-0.5',
	medium: 'h-1',
};

export default function GradBar({
	color = 'blue',
	size = 'medium',
	...props
}: Props) {
	return (
		<div
			{...props}
			className={clsx(
				'w-full bg-gradient-to-r',
				COLOR_TO_CLASSNAMES[color],
				SIZE_TO_CLASSNAMES[size],
				props.className,
			)}
		/>
	);
}
