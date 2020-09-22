import { gql, useMutation } from "@apollo/client";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  post: {
    id: string;
    title: string;
    text: string;
    visibility?: string;
    favoritesCount: number;
    hasFavorited: boolean;
    media: {
      url: string;
      type: string;
    }[];
  };
  user?: {
    id: string;
    displayName: string;
  };
};

export const PostFragment = gql`
  fragment PostFragment_post on Post {
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
`;

export default function Post({ post, user }: Props) {
  const [commit] = useMutation(
    gql`
      mutation PostFavoriteMutation($input: FavoritePostInput!) {
        favoritePost(input: $input) {
          id
          favoritesCount
          hasFavorited
        }
      }
    `,
    {
      variables: {
        input: {
          id: post.id,
        },
      },
    }
  );

  function handleFavorite() {
    commit();
  }

  return (
    <div className="rounded-md bg-white shadow overflow-hidden">
      <div className="bg-indigo-300 h-32 relative overflow-hidden">
        <img
          src={post.media[0]?.url ?? "https://picsum.photos/300/300"}
          alt={post.title}
          className="object-cover absolute w-full h-full"
        />
        {post.visibility && (
          <div className="absolute right-0 flex justify-end p-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800">
              {post.visibility}
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
              post.hasFavorited ? "text-green-600" : "text-gray-400"
            )}
            onClick={handleFavorite}
          >
            <div className="text-sm">{post.favoritesCount ?? "0"}</div>
            <div>
              {post.hasFavorited ? (
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
          {post.title}
        </div>

        <div className="text-gray-700 text-lg">{post.text}</div>

        {user && (
          <Link to={`/profiles/${user.id}`} className="flex items-center">
            <div className="rounded-full h-8 w-8 bg-red-300 mr-4" />
            <div className="text-gray-900 font-semibold">
              {user.displayName}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
