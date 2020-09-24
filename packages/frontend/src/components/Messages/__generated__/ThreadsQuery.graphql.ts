/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "0f79050974e8e673944819a21154487c",
    "id": null,
    "metadata": {},
    "name": "ThreadsQuery",
    "operationKind": "query",
    "text": "query ThreadsQuery {\n  messageThreads {\n    id\n    ...Thread_messageThread\n  }\n}\n\nfragment Thread_messageThread on MessageThread {\n  id\n  participants {\n    user {\n      id\n      name\n    }\n    id\n  }\n  lastMessage {\n    id\n    text\n  }\n}\n"
  }
};
})();
(node as any).hash = '8d220e7181e10fc5735864a9d51a3198';
export default node;
