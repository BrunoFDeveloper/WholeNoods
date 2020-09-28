import Post from './ui/Post';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { HomeQuery } from './__generated__/HomeQuery.graphql';

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
			<div className="divide-y">
				{data.home.posts.map((post) => (
					<Post post={post} />
				))}
			</div>
		</div>
	);
}
