import clsx from 'clsx';

type Props = {
	src: string;
	alt?: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
};

export default function ProfileCard({ src, alt, className }: Props) {
	return (
		<div
			className={clsx(
				'bg-gray-200 rounded h-10 w-8 overflow-hidden',
				className,
			)}
		>
			<img src={src} alt={alt} className="h-full w-full object-cover" />
		</div>
	);
}
