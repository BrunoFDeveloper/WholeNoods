/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HeaderUserLinksQueryVariables = {};
export type HeaderUserLinksQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly name: string;
        readonly username: string;
        readonly isCreator: boolean;
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
    "cacheID": "bd946eb2322627d05b78f4d0b37a7683",
    "id": null,
    "metadata": {},
    "name": "HeaderUserLinksQuery",
    "operationKind": "query",
    "text": "query HeaderUserLinksQuery {\n  viewer {\n    id\n    name\n    username\n    isCreator\n  }\n}\n"
  }
};
})();
(node as any).hash = '05af69025e077b95e9bc53017010e183';
export default node;
