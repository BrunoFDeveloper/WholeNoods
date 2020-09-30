/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8ed7442e77a84a78ccf0537e9c960d62 */

import { ConcreteRequest } from "relay-runtime";
export type HeaderUserLinksQueryVariables = {};
export type HeaderUserLinksQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly name: string;
        readonly username: string;
        readonly isCreator: boolean;
        readonly avatarUrl: string;
    } | null;
};
export type HeaderUserLinksQuery = {
    readonly response: HeaderUserLinksQueryResponse;
    readonly variables: HeaderUserLinksQueryVariables;
};



/*
query HeaderUserLinksQuery {
  viewer {
    id
    name
    username
    isCreator
    avatarUrl
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCreator",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "avatarUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeaderUserLinksQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeaderUserLinksQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "8ed7442e77a84a78ccf0537e9c960d62",
    "metadata": {},
    "name": "HeaderUserLinksQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '8834c04fbe6df2fe078a6eba2d93516a';
export default node;
