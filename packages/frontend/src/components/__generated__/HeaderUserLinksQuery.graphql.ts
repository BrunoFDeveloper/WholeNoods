/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserType = "CREATOR" | "VIEWER" | "%future added value";
export type HeaderUserLinksQueryVariables = {};
export type HeaderUserLinksQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly name: string;
        readonly username: string;
        readonly type: UserType;
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
    type
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
        "name": "type",
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
    "cacheID": "2569209bac039e90483b6b0e7976a249",
    "id": null,
    "metadata": {},
    "name": "HeaderUserLinksQuery",
    "operationKind": "query",
    "text": "query HeaderUserLinksQuery {\n  viewer {\n    id\n    name\n    username\n    type\n  }\n}\n"
  }
};
})();
(node as any).hash = '9520d57d77efa44e3965bbf55a6f6c66';
export default node;
