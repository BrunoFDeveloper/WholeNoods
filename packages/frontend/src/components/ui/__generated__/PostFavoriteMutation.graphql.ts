/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 3863ddc9deac589008a5765869940180 */

import { ConcreteRequest } from "relay-runtime";
export type FavoritePostInput = {
    id: string;
};
export type PostFavoriteMutationVariables = {
    input: FavoritePostInput;
};
export type PostFavoriteMutationResponse = {
    readonly favoritePost: {
        readonly id: string;
        readonly favoritesCount: number;
        readonly hasFavorited: boolean;
    };
};
export type PostFavoriteMutation = {
    readonly response: PostFavoriteMutationResponse;
    readonly variables: PostFavoriteMutationVariables;
};



/*
mutation PostFavoriteMutation(
  $input: FavoritePostInput!
) {
  favoritePost(input: $input) {
    id
    favoritesCount
    hasFavorited
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
    "name": "favoritePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "favoritesCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasFavorited",
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
    "name": "PostFavoriteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostFavoriteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "3863ddc9deac589008a5765869940180",
    "metadata": {},
    "name": "PostFavoriteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'b3dd471b993e591709aef26e0a6639e6';
export default node;
