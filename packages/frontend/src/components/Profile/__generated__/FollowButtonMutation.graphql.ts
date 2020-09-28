/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FollowInput = {
    userId: string;
};
export type FollowButtonMutationVariables = {
    input: FollowInput;
};
export type FollowButtonMutationResponse = {
    readonly follow: {
        readonly id: string;
        readonly isFollowing: boolean;
    };
};
export type FollowButtonMutation = {
    readonly response: FollowButtonMutationResponse;
    readonly variables: FollowButtonMutationVariables;
};



/*
mutation FollowButtonMutation(
  $input: FollowInput!
) {
  follow(input: $input) {
    id
    isFollowing
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "follow",
    "plural": false,
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8c9d2e77213a4689004962336bdc083d",
    "id": null,
    "metadata": {},
    "name": "FollowButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowButtonMutation(\n  $input: FollowInput!\n) {\n  follow(input: $input) {\n    id\n    isFollowing\n  }\n}\n"
  }
};
})();
(node as any).hash = '168d71d843209b2332d8280d5c1fe0b8';
export default node;
