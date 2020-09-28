/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserType = "CREATOR" | "VIEWER" | "%future added value";
export type ProfileQueryVariables = {
    username: string;
};
export type ProfileQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly name: string;
        readonly username: string;
        readonly bio: string;
        readonly type: UserType;
        readonly postsCount: number;
        readonly subscribersCount: number;
        readonly isViewer: boolean;
        readonly isCurrentlySubscribed: boolean;
        readonly isFollowing: boolean;
        readonly pinnedPost: {
            readonly " $fragmentRefs": FragmentRefs<"Post_post">;
        } | null;
        readonly posts: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"Post_post">;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"FollowButton_user">;
    };
};
export type ProfileQuery = {
    readonly response: ProfileQueryResponse;
    readonly variables: ProfileQueryVariables;
};



/*
query ProfileQuery(
  $username: String!
) {
  user(username: $username) {
    id
    name
    username
    bio
    type
    postsCount
    subscribersCount
    isViewer
    isCurrentlySubscribed
    isFollowing
    ...FollowButton_user
    pinnedPost {
      ...Post_post
      id
    }
    posts {
      ...Post_post
      id
    }
  }
}

fragment FollowButton_user on User {
  id
  isFollowing
}

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
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bio",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postsCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subscribersCount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewer",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isCurrentlySubscribed",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowing",
  "storageKey": null
},
v12 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Post_post"
  }
],
v13 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "text",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "visibility",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "favoritesCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hasFavorited",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PostMedia",
    "kind": "LinkedField",
    "name": "media",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      },
      (v6/*: any*/),
      (v2/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "pinnedPost",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FollowButton_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "pinnedPost",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": (v13/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5996df06298dbadbe17264005c2cd2d1",
    "id": null,
    "metadata": {},
    "name": "ProfileQuery",
    "operationKind": "query",
    "text": "query ProfileQuery(\n  $username: String!\n) {\n  user(username: $username) {\n    id\n    name\n    username\n    bio\n    type\n    postsCount\n    subscribersCount\n    isViewer\n    isCurrentlySubscribed\n    isFollowing\n    ...FollowButton_user\n    pinnedPost {\n      ...Post_post\n      id\n    }\n    posts {\n      ...Post_post\n      id\n    }\n  }\n}\n\nfragment FollowButton_user on User {\n  id\n  isFollowing\n}\n\nfragment Post_post on Post {\n  id\n  text\n  visibility\n  favoritesCount\n  hasFavorited\n  user {\n    id\n    name\n    username\n  }\n  media {\n    url\n    type\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f5640f60ff89d67b0059eaa8188c30fc';
export default node;
