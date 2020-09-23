import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './BaseEntity';
import { Post } from './Post';
import { User } from './User';

@Entity()
@ObjectType()
export class PostComment extends ExternalEntity {
	text!: string;

	@ManyToOne(() => Post, (post) => post.comments, { lazy: true })
	post!: Lazy<Post>;

	@ManyToOne(() => User, { lazy: true })
	user!: Lazy<User>;
}
