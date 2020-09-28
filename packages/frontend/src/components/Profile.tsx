import { useParams } from 'react-router-dom';
import Button from './ui/Button';
import Post from './ui/Post';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks';
import { ProfileQuery } from './__generated__/ProfileQuery.graphql';
import { ProfileSubscribeMutation } from './__generated__/ProfileSubscribeMutation.graphql';
import Heading from './ui/Heading';
import ProfileCard from './ui/ProfileCard';
import GradBar from './ui/GradBar';
import Tabs from './ui/Tabs';
import { useState } from 'react';
import FollowButton from './Profile/FollowButton';
import SubscribeBox from './Profile/SubscribeBox';

function Stat({ count, label }: { count: number; label: string }) {
	return (
		<div className="text-lg flex items-center text-gray-400">
			<span className="font-serif text-2xl font-semibold mr-2">{count}</span>
			{label}
		</div>
	);
}

export default function Profile() {
	const [tab, setTab] = useState(0);
	const params = useParams();
	const data = useLazyLoadQuery<ProfileQuery>(
		graphql`
			query ProfileQuery($username: String!) {
				user(username: $username) {
					id
					name
					username
					bio
					type
					postsCount
					subscribersCount
					isViewer
					isCurrentlySubscribed
					isFollowing
					...FollowButton_user
					pinnedPost {
						...Post_post
					}
					posts {
						...Post_post
					}
				}
			}
		`,
		{
			username: params.username,
		},
	);

	return (
		<div>
			<div
				className="h-48 bg-cover relative"
				style={{
					backgroundImage:
						'url(https://pbs.twimg.com/profile_banners/24228166/1373133489/1500x500)',
				}}
			>
				<div className="inset w-full h-full bg-gradient-to-b from-transparent to-black opacity-25"></div>
			</div>
			<div className="container mx-auto px-4 md:px-0 relative">
				<div className="flex flex-col md:flex-row md:space-x-6">
					<div className="flex-1 flex md:space-x-6 flex-col md:flex-row">
						<div className="-mt-10 z-10 mx-auto md:mx-0">
							<ProfileCard
								src="https://github.com/kesne.png"
								size="large"
								className="shadow-xl"
							/>
						</div>
						<div className="flex-1 space-y-6">
							<div className="flex items-start justify-between my-6">
								<div>
									<Heading size="h2">{data.user.name}</Heading>
									<div className="text-gray-500 mt-2">
										@{data.user.username}
									</div>
								</div>
								{!data.user.isViewer && <FollowButton user={data.user} />}
							</div>
							{data.user.bio && (
								<div className="text-gray-200 text-lg">{data.user.bio}</div>
							)}
							<Tabs
								tabs={[<div>Posts</div>, <div>Media</div>]}
								selectedIndex={tab}
								onChange={setTab}
							/>
							<div className="space-y-6 mt-4">
								{data.user.pinnedPost && <Post post={data.user.pinnedPost} />}
								<div className="divide-y">
									{data.user.posts.map((post) => (
										<Post post={post} />
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="sticky bottom-6 px-2 p-0 md:top-6 h-full md:-mt-10">
						<SubscribeBox />
					</div>
				</div>
			</div>
		</div>
	);
}
