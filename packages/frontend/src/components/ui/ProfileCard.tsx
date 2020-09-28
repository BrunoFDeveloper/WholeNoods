import clsx from 'clsx';

type Props = {
	src: string;
	alt?: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
};

const SIZE_TO_CLASSES = {
	small: 'h-10 w-8 rounded',
	medium: 'h-12 w-10 rounded-md',
	large: 'h-40 w-32 rounded-lg',
};

export default function ProfileCard({
	src,
	alt,
	size = 'small',
	className,
}: Props) {
	return (
		<div
			className={clsx(
				'bg-gray-200 rounded overflow-hidden',
				SIZE_TO_CLASSES[size],
				className,
			)}
		>
			<img src={src} alt={alt} className="h-full w-full object-cover" />
		</div>
	);
}
