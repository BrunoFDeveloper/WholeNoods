import { Suspense } from 'react';
import Header from './Header';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className="flex flex-col h-full">
			<Header />
			<Suspense fallback="TODO: Real fallback UI">{children}</Suspense>
		</div>
	);
}
