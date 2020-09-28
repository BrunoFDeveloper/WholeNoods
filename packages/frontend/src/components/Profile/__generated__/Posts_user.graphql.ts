/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Posts_user = {
    readonly pinnedPost: {
        readonly " $fragmentRefs": FragmentRefs<"Post_post">;
    } | null;
    readonly posts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Post_post">;
    }>;
    readonly " $refType": "Posts_user";
};
export type Posts_user$data = Posts_user;
export type Posts_user$key = {
    readonly " $data"?: Posts_user$data;
    readonly " $fragmentRefs": FragmentRefs<"Posts_user">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Post_post"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Posts_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "pinnedPost",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "posts",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = '68c1816225ca34f863d64c07130510a3';
export default node;
