/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInMutationVariables = {
    email: string;
    password: string;
};
export type SignInMutationResponse = {
    readonly signIn: {
        readonly requiresTOTP: boolean;
    };
};
export type SignInMutation = {
    readonly response: SignInMutationResponse;
    readonly variables: SignInMutationVariables;
};



/*
mutation SignInMutation(
  $email: String!
  $password: String!
) {
  signIn(email: $email, password: $password) {
    requiresTOTP
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
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
    "cacheID": "cfdae84eb39f844738b3ee7e0600e2f9",
    "id": null,
    "metadata": {},
    "name": "SignInMutation",
    "operationKind": "mutation",
    "text": "mutation SignInMutation(\n  $email: String!\n  $password: String!\n) {\n  signIn(email: $email, password: $password) {\n    requiresTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e0480cacc6f0e2a1ec833475f284477f';
export default node;
