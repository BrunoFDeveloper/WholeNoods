import Koa from 'koa';
import { User, AuthType } from './entities/User';

export type Session = {
	userID: string;
	type: AuthType;
};

export type Lazy<T> = T | Promise<T>;

export type KoaContext = Koa.ParameterizedContext & {
	session: Session;
};

export type AuthorizedContext = {
	ctx: KoaContext;
	user: User;
};

export type UnauthorizedContext = {
	ctx: KoaContext;
	user?: null;
};

export type Context = AuthorizedContext | UnauthorizedContext;
