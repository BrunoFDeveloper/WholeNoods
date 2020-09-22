/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostVisibility = "PRIVATE" | "PRIVATE_PREVIEW" | "PUBLIC" | "%future added value";
export type Post_post = {
    readonly id: string;
    readonly title: string | null;
    readonly text: string;
    readonly visibility: PostVisibility;
    readonly favoritesCount: number;
    readonly hasFavorited: boolean;
    readonly media: ReadonlyArray<{
        readonly url: string;
        readonly type: number;
    }>;
    readonly " $refType": "Post_post";
};
export type Post_post$data = Post_post;
export type Post_post$key = {
    readonly " $data"?: Post_post$data;
    readonly " $fragmentRefs": FragmentRefs<"Post_post">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Post_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '68ebd939a895d20ab325e9347af1ab65';
export default node;
