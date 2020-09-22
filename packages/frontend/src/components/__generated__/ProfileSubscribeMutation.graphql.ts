/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileSubscribeMutationVariables = {
    id: string;
};
export type ProfileSubscribeMutationResponse = {
    readonly subscribe: {
        readonly id: string;
        readonly isCurrentlySubscribed: boolean;
    };
};
export type ProfileSubscribeMutation = {
    readonly response: ProfileSubscribeMutationResponse;
    readonly variables: ProfileSubscribeMutationVariables;
};



/*
mutation ProfileSubscribeMutation(
  $id: ID!
) {
  subscribe(user: $id) {
    id
    isCurrentlySubscribed
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "subscribe",
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
        "name": "isCurrentlySubscribed",
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
    "name": "ProfileSubscribeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileSubscribeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5ca2d235c855ca8242311432307aa077",
    "id": null,
    "metadata": {},
    "name": "ProfileSubscribeMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileSubscribeMutation(\n  $id: ID!\n) {\n  subscribe(user: $id) {\n    id\n    isCurrentlySubscribed\n  }\n}\n"
  }
};
})();
(node as any).hash = '0562c2280db9ef1c3d2c65c0d08f4b88';
export default node;
