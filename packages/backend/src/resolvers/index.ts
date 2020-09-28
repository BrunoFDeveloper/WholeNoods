import { AuthResolver } from './AuthResolver';
import { FollowResolver } from './FollowResolver';
import { HomeResolver } from './HomeResolver';
import { MessageResolver } from './MessageResolver';
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
	MessageResolver,
	FollowResolver,
] as const;
