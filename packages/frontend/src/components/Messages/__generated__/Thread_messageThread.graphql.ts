/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Thread_messageThread = {
    readonly participants: ReadonlyArray<{
        readonly user: {
            readonly id: string;
            readonly name: string;
        };
    }>;
    readonly lastMessage: {
        readonly id: string;
        readonly text: string;
    } | null;
    readonly " $refType": "Thread_messageThread";
};
export type Thread_messageThread$data = Thread_messageThread;
export type Thread_messageThread$key = {
    readonly " $data"?: Thread_messageThread$data;
    readonly " $fragmentRefs": FragmentRefs<"Thread_messageThread">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Thread_messageThread",
  "selections": [
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
        }
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
  "type": "MessageThread",
  "abstractKey": null
};
})();
(node as any).hash = '97a66a74e574431ec191061ec4ff8939';
export default node;
