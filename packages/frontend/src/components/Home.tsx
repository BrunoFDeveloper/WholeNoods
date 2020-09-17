import { gql, useQuery } from "@apollo/client";
import React from "react";
import Post from "./shared/Post";

export default function Home() {
  const { data, loading } = useQuery(gql`
    query HomeQuery {
      home {
        posts {
          id
          title
          text
          visibility
          user {
            id
            displayName
          }
        }
      }
    }
  `);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      {data.home.posts.map((post: any) => (
        <Post post={post} user={post.user} />
      ))}
    </div>
  );
}
