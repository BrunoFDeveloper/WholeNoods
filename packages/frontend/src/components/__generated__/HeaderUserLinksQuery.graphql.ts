/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HeaderUserLinksQueryVariables = {};
export type HeaderUserLinksQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly displayName: string;
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
    displayName
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
        "name": "displayName",
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
    "cacheID": "2bc86e4a1b2c0f24901219b0d1482a7c",
    "id": null,
    "metadata": {},
    "name": "HeaderUserLinksQuery",
    "operationKind": "query",
    "text": "query HeaderUserLinksQuery {\n  viewer {\n    id\n    displayName\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c369f2331525a1088ea8c3af8028b0a5';
export default node;
