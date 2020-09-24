/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageListQueryVariables = {
    id: string;
};
export type MessageListQueryResponse = {
    readonly messageThread: {
        readonly id: string;
        readonly messages: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Message_message">;
        }>;
    };
};
export type MessageListQuery = {
    readonly response: MessageListQueryResponse;
    readonly variables: MessageListQueryVariables;
};



/*
query MessageListQuery(
  $id: ID!
) {
  messageThread(id: $id) {
    id
    messages {
      id
      ...Message_message
    }
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
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "name": "MessageListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageThread",
        "kind": "LinkedField",
        "name": "messageThread",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "messages",
            "plural": true,
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageThread",
        "kind": "LinkedField",
        "name": "messageThread",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "messages",
            "plural": true,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ed33b48df73ac69ddd33ee40d0ecdecb",
    "id": null,
    "metadata": {},
    "name": "MessageListQuery",
    "operationKind": "query",
    "text": "query MessageListQuery(\n  $id: ID!\n) {\n  messageThread(id: $id) {\n    id\n    messages {\n      id\n      ...Message_message\n    }\n  }\n}\n\nfragment Message_message on Message {\n  text\n  fromViewer\n  user {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a9405a7421a104549d84e8690abc9f56';
export default node;
