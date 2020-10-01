import Post from '../ui/Post';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { HomeQuery } from './__generated__/HomeQuery.graphql';
import Navigation from './Navigation';
import Recommendations from './Recommendations';

export default function Home() {
	const data = useLazyLoadQuery<HomeQuery>(
		graphql`
			query HomeQuery {
				home {
					posts {
						id
						...Post_post
					}
				}
			}
		`,
		{},
	);

	return (
		<div className="container mx-auto">
			<div className="flex space-x-8">
				<div className="w-48">
					<Navigation />
				</div>
				<div className="flex-1 divide-y">
					{data.home.posts.map((post) => (
						<Post post={post} />
					))}
				</div>
				<div className="w-80">
					<Recommendations />
				</div>
			</div>
		</div>
	);
}
