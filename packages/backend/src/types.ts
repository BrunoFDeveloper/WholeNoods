import { Request } from "express";
import { User, AuthType } from "./entities/User";

export type Session = {
  userID: number;
  type: AuthType;
};

export type Lazy<T> = T | Promise<T>;

export type AuthorizedContext = {
  req: Request;
  user: User;
};

export type UnauthorizedContext = {
  req: Request;
  user?: null;
};

export type Context = AuthorizedContext | UnauthorizedContext;
