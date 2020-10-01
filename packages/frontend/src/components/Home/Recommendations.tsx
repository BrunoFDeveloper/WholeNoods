import ProfileCard from '../ui/ProfileCard';

function UserRec() {
	return (
		<div className="flex items-center text-gray-100 space-x-4">
			<ProfileCard src="https://github.com/tnarla.png" size="medium" />
			<div>
				<div className="font-bold leading-3">Name</div>
				<div className="text-gray-200 text-sm">@username</div>
			</div>
		</div>
	);
}

export default function Recommendations() {
	return (
		<div className="p-6 rounded border-2 border-gray-800">
			<div className="text-gray-100 font-bold text-lg">
				Recommended Creators
			</div>
			<div className="space-y-8 mt-4">
				<UserRec />
				<UserRec />
				<UserRec />
			</div>
		</div>
	);
}
