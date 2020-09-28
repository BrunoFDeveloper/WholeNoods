import GradBar from '../ui/GradBar';

function NavLink({ label }: { label: string }) {
	return (
		<div className="text-gray-100 text-lg font-bold flex">
			<div>
				{label}
				<GradBar />
			</div>
		</div>
	);
}

export default function Navigation() {
	return (
		<div className="space-y-2">
			<NavLink label="Following" />
			<NavLink label="Something" />
		</div>
	);
}
