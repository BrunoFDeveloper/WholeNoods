import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import ProfileCard from './ui/ProfileCard';
import { HeaderUserLinksQuery } from './__generated__/HeaderUserLinksQuery.graphql';

function HeaderUserLinks() {
	const data = useLazyLoadQuery<HeaderUserLinksQuery>(
		graphql`
			query HeaderUserLinksQuery {
				viewer {
					id
					name
					username
					isCreator
				}
			}
		`,
		{},
	);

	return data.viewer ? (
		<div className="flex items-center space-x-6">
			{!data.viewer.isCreator && (
				<Link to="/apply" className="text-indigo-500 font-bold text-lg">
					Become a Creator
				</Link>
			)}
			<Link
				className="font-bold text-lg"
				to={`/profiles/${data.viewer.username}`}
			>
				{data.viewer.name}
			</Link>
			<ProfileCard src="https://github.com/kesne.png" className="-my-1" />
		</div>
	) : (
		<Link className="font-bold text-lg" to="/signin">
			Sign in
		</Link>
	);
}

export default function Header() {
	return (
		<div className="py-6 px-12 text-white">
			<div className="flex justify-between container mx-auto">
				<div className="flex items-center">
					<Link to="/">
						<div className="font-bold italic text-lg">noods</div>
					</Link>
					<div className="w-0 h-8 border-r border-2 border-indigo-500 mx-6"></div>
					<div className="space-x-8 flex items-center">
						<Link to="/posts/create" className="font-bold text-lg">
							Create Post
						</Link>
						<Link to="/messages" className="font-bold text-lg">
							Messages
						</Link>
					</div>
				</div>
				<div>
					<Suspense fallback={null}>
						<HeaderUserLinks />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
