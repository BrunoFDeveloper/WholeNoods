/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 83245f653e2e0b98866adcdb761fc083 */

import { ConcreteRequest } from "relay-runtime";
export type PostVisibility = "PRIVATE" | "PRIVATE_PREVIEW" | "PUBLIC" | "%future added value";
export type CreatePostInput = {
    media: Array<unknown>;
    text: string;
    visibility: PostVisibility;
};
export type CreatePostMutationVariables = {
    input: CreatePostInput;
};
export type CreatePostMutationResponse = {
    readonly createPost: {
        readonly id: string;
    };
};
export type CreatePostMutation = {
    readonly response: CreatePostMutationResponse;
    readonly variables: CreatePostMutationVariables;
};



/*
mutation CreatePostMutation(
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
    "name": "CreatePostMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "83245f653e2e0b98866adcdb761fc083",
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '1f1a82b6a62ecfbae185a69fb35d286f';
export default node;
