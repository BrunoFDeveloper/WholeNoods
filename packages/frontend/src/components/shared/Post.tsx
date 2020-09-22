import clsx from "clsx";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import PostUser from "./PostUser";
import { PostUser_user$key } from "./__generated__/PostUser_user.graphql";
import { Post_post$key } from "./__generated__/Post_post.graphql";

type Props = {
  post: Post_post$key;
  user?: PostUser_user$key;
};

export default function Post({ post, user }: Props) {
  const data = useFragment(
    graphql`
      fragment Post_post on Post {
        id
        title
        text
        visibility
        favoritesCount
        hasFavorited
        media {
          url
          type
        }
      }
    `,
    post
  );

  const [commit] = useMutation(
    graphql`
      mutation PostFavoriteMutation($input: FavoritePostInput!) {
        favoritePost(input: $input) {
          id
          favoritesCount
          hasFavorited
        }
      }
    `
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
    <div className="rounded-md bg-white shadow overflow-hidden">
      <div className="bg-indigo-300 h-32 relative overflow-hidden">
        <img
          src={data.media[0]?.url ?? "https://picsum.photos/300/300"}
          alt={data.title || "Post Image"}
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

      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <div className="font-bold text-gray-500 text-sm">Aug 2nd, 2020</div>
          <button
            className={clsx(
              "flex items-center space-x-1 focus:outline-none",
              data.hasFavorited ? "text-green-600" : "text-gray-400"
            )}
            onClick={handleFavorite}
          >
            <div className="text-sm">{data.favoritesCount ?? "0"}</div>
            <div>
              {data.hasFavorited ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>

        <div className="font-serif font-semibold text-xl text-gray-900">
          {data.title}
        </div>

        <div className="text-gray-700 text-lg">{data.text}</div>

        {user && <PostUser user={user} />}
      </div>
    </div>
  );
}
