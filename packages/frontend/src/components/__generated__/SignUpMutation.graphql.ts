/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignUpMutationVariables = {
    name: string;
    email: string;
    password: string;
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
  $name: String!
  $email: String!
  $password: String!
) {
  signUp(name: $name, email: $email, password: $password) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v3 = [
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
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "SignUpMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c9f808897a96643670cedb2d3fa1146c",
    "id": null,
    "metadata": {},
    "name": "SignUpMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpMutation(\n  $name: String!\n  $email: String!\n  $password: String!\n) {\n  signUp(name: $name, email: $email, password: $password) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e22952a91f0a167665f16a865ccd1e17';
export default node;
