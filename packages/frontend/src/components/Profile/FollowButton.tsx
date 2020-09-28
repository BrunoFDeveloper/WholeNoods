import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import Button from '../ui/Button';
import { FollowButtonMutation } from './__generated__/FollowButtonMutation.graphql';
import { FollowButton_user$key } from './__generated__/FollowButton_user.graphql';

type Props = {
	user: FollowButton_user$key;
};

export default function FollowButton({ user }: Props) {
	const data = useFragment(
		graphql`
			fragment FollowButton_user on User {
				id
				isFollowing
			}
		`,
		user,
	);

	const [commit, isInFlight] = useMutation<FollowButtonMutation>(graphql`
		mutation FollowButtonMutation($input: FollowInput!) {
			follow(input: $input) {
				id
				isFollowing
			}
		}
	`);

	return (
		<Button
			variant={data.isFollowing ? 'primary' : 'outlined'}
			disabled={isInFlight}
			onClick={() => {
				commit({
					variables: {
						input: {
							userId: data.id,
						},
					},
				});
			}}
		>
			{data.isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
}
