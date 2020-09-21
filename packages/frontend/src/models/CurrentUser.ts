import { types } from "mobx-state-tree";

export const CurrentUser = types
  .model({
    isSignedIn: false,
  })
  .actions((self) => ({
    setIsSignedIn(isSignedIn: boolean) {
      self.isSignedIn = isSignedIn;
    },
  }));
