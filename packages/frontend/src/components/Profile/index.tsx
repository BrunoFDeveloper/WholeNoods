import { useParams } from 'react-router-dom';
import Post from '../ui/Post';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { ProfileQuery } from './__generated__/ProfileQuery.graphql';
import Heading from '../ui/Heading';
import ProfileCard from '../ui/ProfileCard';
import Tabs from '../ui/Tabs';
import { useState } from 'react';
import FollowButton from './FollowButton';
import SubscribeBox from './SubscribeBox';
import Posts from './Posts';
import MediaPosts from './MediaPosts';
import Badge from '../ui/Badge';

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
					avatarUrl
					isCurrentlySubscribed
					isFollowing
					...FollowButton_user
					...Posts_user
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
								src={data.user.avatarUrl}
								size="large"
								className="shadow-xl"
							/>
							<div className="flex text-gray-200 text-sm font-bold justify-center items-center space-x-2 p-2">
								<div className="space-x-1 flex items-center">
									<div>{data.user.subscribersCount}</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-4 w-4"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="space-x-1 flex items-center">
									<div>{data.user.subscribersCount}</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="h-4 w-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
										/>
									</svg>
								</div>
							</div>
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
								tabs={[
									<div className="flex items-center space-x-2">
										<div>Posts</div>
										<Badge color="blue">{data.user.postsCount}</Badge>
									</div>,
									<div className="flex items-center space-x-2">
										<div>Media</div>
										<Badge color="pink">{data.user.postsCount}</Badge>
									</div>,
								]}
								selectedIndex={tab}
								onChange={setTab}
							/>
							{tab === 0 ? <Posts user={data.user} /> : <MediaPosts />}
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
