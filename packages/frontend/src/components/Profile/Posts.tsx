import { graphql, useFragment } from 'react-relay/hooks';
import Post from '../ui/Post';
import { Posts_user$key } from './__generated__/Posts_user.graphql';

type Props = {
	user: Posts_user$key;
};

export default function Posts({ user }: Props) {
	const data = useFragment(
		graphql`
			fragment Posts_user on User {
				pinnedPost {
					...Post_post
				}
				posts {
					...Post_post
				}
			}
		`,
		user,
	);

	return (
		<div className="space-y-6 mt-4">
			{data.pinnedPost && <Post post={data.pinnedPost} />}
			<div className="divide-y">
				{data.posts.map((post) => (
					<Post post={post} />
				))}
			</div>
		</div>
	);
}
