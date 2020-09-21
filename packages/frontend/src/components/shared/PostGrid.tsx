import React from "react";
import Post from "./Post";

type Props = {
  posts: any[];
  user?: any;
};

export default function PostGrid({ posts, user }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post post={post} user={user} />
      ))}
    </div>
  );
}
