/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 0f79050974e8e673944819a21154487c */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ThreadsQueryVariables = {};
export type ThreadsQueryResponse = {
    readonly messageThreads: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"Thread_messageThread">;
    }>;
};
export type ThreadsQuery = {
    readonly response: ThreadsQueryResponse;
    readonly variables: ThreadsQueryVariables;
};



/*
query ThreadsQuery {
  messageThreads {
    id
    ...Thread_messageThread
  }
}

fragment Thread_messageThread on MessageThread {
  id
  participants {
    user {
      id
      name
    }
    id
  }
  lastMessage {
    id
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ThreadsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MessageThread",
        "kind": "LinkedField",
        "name": "messageThreads",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Thread_messageThread"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ThreadsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MessageThread",
        "kind": "LinkedField",
        "name": "messageThreads",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageThreadParticipant",
            "kind": "LinkedField",
            "name": "participants",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "lastMessage",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
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
    "id": "0f79050974e8e673944819a21154487c",
    "metadata": {},
    "name": "ThreadsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '8d220e7181e10fc5735864a9d51a3198';
export default node;
