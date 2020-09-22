import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import { Link } from "react-router-dom";

type Props = {
  user: any;
};

export default function PostUser({ user }: Props) {
  const data = useFragment(
    graphql`
      fragment PostUser_user on User {
        id
        displayName
      }
    `,
    user
  );

  return (
    <Link to={`/profiles/${data.id}`} className="flex items-center">
      <div className="rounded-full h-8 w-8 bg-red-300 mr-4" />
      <div className="text-gray-900 font-semibold">{data.displayName}</div>
    </Link>
  );
}
