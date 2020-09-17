import React from "react";
import { Link } from "react-router-dom";

type Props = {
  post: {
    title: string;
    text: string;
    visibility?: string;
    favoritesCount: number;
  };
  user: {
    id: string;
    displayName: string;
  };
};

export default function Post({ post, user }: Props) {
  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="bg-indigo-300 h-32 relative">
        {post.visibility && (
          <div className="inset flex justify-end p-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800">
              {post.visibility}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <div className="font-bold text-gray-500 text-sm">Aug 2nd, 2020</div>
          <div>LIKE BUTTON {post.favoritesCount}</div>
        </div>

        <div className="font-serif font-semibold text-2xl text-gray-900">
          {post.title}
        </div>

        <div className="text-gray-700 text-lg">{post.text}</div>

        <Link to={`/profile/${user.id}`} className="flex items-center">
          <div className="rounded-full h-8 w-8 bg-red-300 mr-4" />
          <div className="text-gray-900 font-semibold">{user.displayName}</div>
        </Link>
      </div>
    </div>
  );
}
