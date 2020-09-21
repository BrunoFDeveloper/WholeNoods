import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import Underline from "./shared/Underline";

export default function Header() {
  const { data } = useQuery(gql`
    query HeaderQuery {
      viewer {
        id
        displayName
      }
    }
  `);

  return (
    <div className="py-6 px-12 bg-green-600 text-white">
      <div className="flex justify-between container mx-auto">
        <div className="flex items-center">
          <div className="font-semibold text-lg">Whole Noods</div>
          <div className="w-0 h-6 border-r border-white mx-6"></div>
          <div className="space-x-8 flex items-center">
            <a className="font-bold text-lg" href="/">
              <Underline>Browse Products</Underline>
            </a>
            <a className="font-bold text-lg" href="/posts/create">
              <Underline>Create Post</Underline>
            </a>
          </div>
        </div>
        <div>
          {data &&
            (data.viewer ? (
              <Link
                className="font-bold text-lg"
                to={`/profiles/${data.viewer.id}`}
              >
                <Underline>{data.viewer.displayName}</Underline>
              </Link>
            ) : (
              <Link className="font-bold text-lg" to="/signin">
                <Underline>Sign in</Underline>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
