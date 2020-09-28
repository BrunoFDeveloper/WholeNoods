import clsx from 'clsx';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import ProfileCard from './ProfileCard';
import { PostFavoriteMutation } from './__generated__/PostFavoriteMutation.graphql';
import { Post_post$key } from './__generated__/Post_post.graphql';

type Props = {
	post: Post_post$key;
};

export default function Post({ post }: Props) {
	const data = useFragment(
		graphql`
			fragment Post_post on Post {
				id
				text
				visibility
				favoritesCount
				hasFavorited
				user {
					id
					name
					username
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
		<div className="space-y-6">
			<div className="flex justify-between">
				<div className="flex items-center space-x-4">
					<ProfileCard src="https://github.com/kesne.png" size="medium" />
					<div>
						<div className="text-lg font-bold text-gray-100 leading-5">
							{data.user.name}
						</div>
						<div className="text-gray-300 text-sm">@{data.user.username}</div>
					</div>
				</div>
				<div className="text-sm text-gray-400">4 Hours Ago</div>
			</div>

			<div className="bg-indigo-300 h-32 relative overflow-hidden">
				<img
					src={data.media[0]?.url ?? 'https://picsum.photos/300/300'}
					alt={'Post Image'}
					className="object-cover absolute w-full h-full"
				/>
				{data.visibility && (
					<div className="absolute right-0 flex justify-end p-2">
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800">
							{data.visibility}
						</span>
					</div>
				)}
			</div>

			<div className="text-gray-100 text-lg">{data.text}</div>

			<div>
				<div className="flex justify-between">
					<button
						className={clsx(
							'flex items-center space-x-1 focus:outline-none',
							data.hasFavorited ? 'text-green-600' : 'text-gray-400',
						)}
						onClick={handleFavorite}
					>
						<div className="text-sm">{data.favoritesCount ?? '0'}</div>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
