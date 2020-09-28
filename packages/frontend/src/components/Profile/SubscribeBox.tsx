import GradBar from '../ui/GradBar';
import Heading from '../ui/Heading';
import Button from '../ui/Button';

export default function SubscribeBox() {
	return (
		<div className="bg-almost-black shadow-white p-6 w-full md:w-80 rounded space-y-4 border border-pink-400">
			<div className="flex justify-center">
				<span className="text-gray-100 font-bold text-lg">
					Become a subscriber
					<GradBar size="small" color="pink" />
				</span>
			</div>
			<div className="flex justify-between items-center">
				<div>
					<div className="flex items-end justify-center">
						<Heading size="h3">$20</Heading>
						<span className="text-gray-400 font-bold ml-1 italic">/ mo</span>
					</div>
				</div>
				<div>
					<Button variant="outlined" color="pink">
						Subscribe
					</Button>
				</div>
			</div>
		</div>
	);
}
