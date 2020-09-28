/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowButton_user = {
    readonly id: string;
    readonly isFollowing: boolean;
    readonly " $refType": "FollowButton_user";
};
export type FollowButton_user$data = FollowButton_user;
export type FollowButton_user$key = {
    readonly " $data"?: FollowButton_user$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowButton_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowButton_user",
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
      "name": "isFollowing",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'f697d1136edd23acc8f0d89ac96588ef';
export default node;
