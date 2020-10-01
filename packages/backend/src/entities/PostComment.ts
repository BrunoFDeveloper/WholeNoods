import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './utils/Base';
import { Post } from './Post';
import { User } from './User';

@Entity()
@ObjectType()
export class PostComment extends ExternalEntity {
	@Field()
	@Column()
	text!: string;

	@ManyToOne(() => Post, (post) => post.comments, { lazy: true })
	post!: Lazy<Post>;

	@ManyToOne(() => User, { lazy: true })
	user!: Lazy<User>;
}
