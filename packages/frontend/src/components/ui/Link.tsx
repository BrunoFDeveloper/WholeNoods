import { Link as RouterLink } from 'react-router-dom';

type Props = {
	to: string;
	children: React.ReactNode;
};

export default function Link({ to, children }: Props) {
	return (
		<RouterLink className="text-indigo-500 font-semibold" to={to}>
			{children}
		</RouterLink>
	);
}
