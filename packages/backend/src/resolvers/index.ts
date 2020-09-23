import { AuthResolver } from './AuthResolver';
import { HomeResolver } from './HomeResolver';
import { MessageThreadResolver } from './MessageThreadResolver';
import { PostResolver } from './PostResolver';
import { SubscriptionResolver } from './SubscriptionResolver';
import { UserResolver } from './UserResolver';

export default [
	AuthResolver,
	HomeResolver,
	UserResolver,
	SubscriptionResolver,
	PostResolver,
	MessageThreadResolver,
] as const;
