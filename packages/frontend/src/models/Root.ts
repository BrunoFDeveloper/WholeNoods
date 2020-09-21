import { types } from "mobx-state-tree";
import { CurrentUser } from "./CurrentUser";

export const RootModel = types.model({
  user: types.optional(CurrentUser, {}),
});
