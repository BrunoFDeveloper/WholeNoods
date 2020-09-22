import { useParams } from "react-router-dom";
import Header from "./shared/Header";
import Button from "./shared/Button";
import Post from "./shared/Post";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { ProfileQuery } from "./__generated__/ProfileQuery.graphql";
import { ProfileSubscribeMutation } from "./__generated__/ProfileSubscribeMutation.graphql";

function Stat({ count, label }: { count: number; label: string }) {
  return (
    <div className="text-lg flex items-center">
      <span className="font-serif text-2xl font-semibold mr-2">{count}</span>
      {label}
    </div>
  );
}

export default function Profile() {
  const params = useParams<{ id: string }>();
  const data = useLazyLoadQuery<ProfileQuery>(
    graphql`
      query ProfileQuery($id: ID!) {
        user(id: $id) {
          id
          displayName
          bio
          type
          postsCount
          subscribersCount
          isCurrentlySubscribed
          ...PostUser_user
          pinnedPost {
            ...Post_post
          }
          posts {
            ...Post_post
          }
        }
      }
    `,
    {
      id: params.id,
    }
  );

  const [commit] = useMutation<ProfileSubscribeMutation>(
    graphql`
      mutation ProfileSubscribeMutation($id: ID!) {
        subscribe(user: $id) {
          id
          isCurrentlySubscribed
        }
      }
    `
  );

  return (
    <div>
      <div
        className="h-48 bg-cover"
        style={{
          backgroundImage:
            "url(https://pbs.twimg.com/profile_banners/24228166/1373133489/1500x500)",
        }}
      />
      <div className="container mx-auto">
        <div className="flex space-x-6">
          <div className="-mt-16 rounded-full h-36 w-36 shadow-lg overflow-hidden border-4 border-white">
            <img src="https://pbs.twimg.com/profile_images/1298717280876892160/DKx_ldOx_400x400.jpg" />
          </div>
          <div className="flex-1">
            <div className="flex my-6">
              <Header>{data.user.displayName}</Header>
              <div className="flex space-x-6 ml-12">
                <Stat count={data.user.postsCount} label="posts" />
                <Stat count={data.user.subscribersCount} label="subscribers" />
              </div>
            </div>
            <div className="text-gray-800 text-lg">
              {data.user.bio || "No user bio found."}
            </div>
            <div className="space-y-6 mt-4">
              {data.user.pinnedPost && <Post post={data.user.pinnedPost} />}
              <div className="grid grid-cols-3 gap-4">
                {data.user.posts.map((post) => (
                  <Post post={post} user={data.user} />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white -mt-16 shadow-lg p-6 w-80 rounded space-y-4 h-full">
            <div className="text-center text-lg text-gray-700">
              Become a subscriber
            </div>
            <div className="flex items-center justify-center">
              <span className="text-4xl font-serif font-bold">$20</span>
              <span className="text-gray-500 ml-1">/ mo</span>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => mutate()}>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
