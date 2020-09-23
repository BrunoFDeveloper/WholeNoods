/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostUser_user = {
    readonly id: string;
    readonly name: string;
    readonly username: string;
    readonly " $refType": "PostUser_user";
};
export type PostUser_user$data = PostUser_user;
export type PostUser_user$key = {
    readonly " $data"?: PostUser_user$data;
    readonly " $fragmentRefs": FragmentRefs<"PostUser_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostUser_user",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'd4075976a393354a18c08a85a534490c';
export default node;
