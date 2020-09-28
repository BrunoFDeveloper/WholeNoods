import clsx from 'clsx';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ProfileCard from './ProfileCard';
import { PostFavoriteMutation } from './__generated__/PostFavoriteMutation.graphql';
import { Post_post$key } from './__generated__/Post_post.graphql';

type Props = {
	post: Post_post$key;
};

function ActionButton({ icon, label, className, onClick }: any) {
	return (
		<button
			className="flex items-center space-x-1 text-gray-200 focus:outline-none"
			onClick={onClick}
		>
			<div className={className}>{icon}</div>
			{typeof label !== 'undefined' && <div className="text-sm">{label}</div>}
		</button>
	);
}

export default function Post({ post }: Props) {
	const data = useFragment(
		graphql`
			fragment Post_post on Post {
				id
				text
				visibility
				favoritesCount
				hasFavorited
				createdAt
				user {
					id
					name
					username
					avatarUrl
				}
				media {
					url
					type
				}
			}
		`,
		post,
	);

	const [commit] = useMutation<PostFavoriteMutation>(
		graphql`
			mutation PostFavoriteMutation($input: FavoritePostInput!) {
				favoritePost(input: $input) {
					id
					favoritesCount
					hasFavorited
				}
			}
		`,
	);

	function handleFavorite() {
		commit({
			variables: {
				input: {
					id: data.id,
				},
			},
		});
	}

	return (
		<div className="space-y-6 py-6 border-gray-800">
			<div className="flex justify-between">
				<div className="flex items-center space-x-4">
					<ProfileCard src={data.user.avatarUrl} size="medium" />
					<div>
						<div className="text-lg font-bold text-gray-100 leading-5">
							{data.user.name}
						</div>
						<div className="text-gray-300 text-sm">@{data.user.username}</div>
					</div>
				</div>
				<div className="text-sm text-gray-400">
					{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
				</div>
			</div>

			<div className="text-gray-100 text-lg">{data.text}</div>

			<div className="h-96 relative overflow-hidden rounded border border-gray-800">
				<img
					src={data.media[0]?.url ?? 'https://picsum.photos/300/300'}
					alt={'Post Image'}
					className="absolute w-full h-full object-cover"
				/>
			</div>

			<div className="flex justify-between">
				<div className="flex items-center space-x-4">
					<ActionButton
						className={data.hasFavorited ? 'text-red-400' : ''}
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-6 w-6"
							>
								<path
									fillRule="evenodd"
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
									clipRule="evenodd"
								/>
							</svg>
						}
						label={data.favoritesCount}
						onClick={handleFavorite}
					/>
					<ActionButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
								/>
							</svg>
						}
						label={data.favoritesCount}
						onClick={handleFavorite}
					/>
					<ActionButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						}
						label="Tip"
						onClick={handleFavorite}
					/>
				</div>
				<div className="flex items-center space-x-4">
					<ActionButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						}
					></ActionButton>
					<ActionButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
								/>
							</svg>
						}
					/>
				</div>
			</div>
		</div>
	);
}
