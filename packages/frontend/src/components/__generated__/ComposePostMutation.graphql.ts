/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PostVisibility = "PRIVATE" | "PRIVATE_PREVIEW" | "PUBLIC" | "%future added value";
export type CreatePostInput = {
    media: Array<unknown>;
    text: string;
    title: string;
    visibility: PostVisibility;
};
export type ComposePostMutationVariables = {
    input: CreatePostInput;
};
export type ComposePostMutationResponse = {
    readonly createPost: {
        readonly id: string;
    };
};
export type ComposePostMutation = {
    readonly response: ComposePostMutationResponse;
    readonly variables: ComposePostMutationVariables;
};



/*
mutation ComposePostMutation(
  $input: CreatePostInput!
) {
  createPost(input: $input) {
    id
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
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "createPost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "ComposePostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComposePostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9b1fe9a316552abde93f6659568ec952",
    "id": null,
    "metadata": {},
    "name": "ComposePostMutation",
    "operationKind": "mutation",
    "text": "mutation ComposePostMutation(\n  $input: CreatePostInput!\n) {\n  createPost(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '508077b263d7beade086bad18cb3f27f';
export default node;
