/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b2e13e54e45ab9560374b060b8867e39 */

import { ConcreteRequest } from "relay-runtime";
export type SignUpInput = {
    email: string;
    name: string;
    password: string;
};
export type SignUpMutationVariables = {
    input: SignUpInput;
};
export type SignUpMutationResponse = {
    readonly signUp: {
        readonly ok: boolean;
    };
};
export type SignUpMutation = {
    readonly response: SignUpMutationResponse;
    readonly variables: SignUpMutationVariables;
};



/*
mutation SignUpMutation(
  $input: SignUpInput!
) {
  signUp(input: $input) {
    ok
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
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "signUp",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "name": "SignUpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "b2e13e54e45ab9560374b060b8867e39",
    "metadata": {},
    "name": "SignUpMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '23a4fb7e2cf388b7e988b897e32f9cea';
export default node;
