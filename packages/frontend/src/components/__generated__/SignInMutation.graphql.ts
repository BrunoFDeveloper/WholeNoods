/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b40e5688155f2bca2a17b63ed0335735 */

import { ConcreteRequest } from "relay-runtime";
export type SignInInput = {
    email: string;
    password: string;
};
export type SignInMutationVariables = {
    input: SignInInput;
};
export type SignInMutationResponse = {
    readonly signIn: {
        readonly ok: boolean;
        readonly requiresTOTP: boolean;
    };
};
export type SignInMutation = {
    readonly response: SignInMutationResponse;
    readonly variables: SignInMutationVariables;
};



/*
mutation SignInMutation(
  $input: SignInInput!
) {
  signIn(input: $input) {
    ok
    requiresTOTP
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
    "concreteType": "SignInResult",
    "kind": "LinkedField",
    "name": "signIn",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requiresTOTP",
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
    "name": "SignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "b40e5688155f2bca2a17b63ed0335735",
    "metadata": {},
    "name": "SignInMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '9553222d2c8f0e5775a568b11238ce55';
export default node;
