/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HeaderUserLinksQueryVariables = {};
export type HeaderUserLinksQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly name: string;
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
    "cacheID": "05a5228b7d36abe4ee861a2fc6f1418b",
    "id": null,
    "metadata": {},
    "name": "HeaderUserLinksQuery",
    "operationKind": "query",
    "text": "query HeaderUserLinksQuery {\n  viewer {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c726898c7f2426934ec8bbe1057dc135';
export default node;
