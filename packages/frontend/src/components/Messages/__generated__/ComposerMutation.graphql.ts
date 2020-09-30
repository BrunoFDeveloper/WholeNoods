/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash dacc3ab779ba61b6c54762488b12ccc6 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SendMessageInput = {
    messageThreadId: string;
    text: string;
};
export type ComposerMutationVariables = {
    input: SendMessageInput;
};
export type ComposerMutationResponse = {
    readonly sendMessage: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"Message_message">;
    };
};
export type ComposerMutation = {
    readonly response: ComposerMutationResponse;
    readonly variables: ComposerMutationVariables;
};



/*
mutation ComposerMutation(
  $input: SendMessageInput!
) {
  sendMessage(input: $input) {
    id
    ...Message_message
  }
}

fragment Message_message on Message {
  text
  fromViewer
  user {
    id
    name
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComposerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Message_message"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComposerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fromViewer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "dacc3ab779ba61b6c54762488b12ccc6",
    "metadata": {},
    "name": "ComposerMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '7b3e46cd031fc8440bf1e78f29d86ba0';
export default node;
