import React from "react";
import Post from "./shared/Post";
import { useLazyLoadQuery, graphql } from "react-relay/hooks";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

export default function Home() {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        home {
          posts {
            id
            ...Post_post
            user {
              ...PostUser_user
            }
          }
        }
      }
    `,
    {}
  );

  return (
    <div className="container mx-auto">
      {data.home.posts.map((post) => (
        <Post post={post} user={post.user} />
      ))}
    </div>
  );
}
