import Koa from 'koa';
import { Logger } from 'pino';
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
	log: Logger;
	ctx: KoaContext;
	user: User;
};

export type UnauthorizedContext = {
	log: Logger;
	ctx: KoaContext;
	user?: null;
};

export type Context = AuthorizedContext | UnauthorizedContext;
