import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './BaseEntity';
import { Favorite } from './Favorite';
import { PostMedia } from './PostMedia';
import { User } from './User';
import { PostComment } from './PostComment';

export enum PostVisibility {
	PUBLIC,
	PRIVATE_PREVIEW,
	PRIVATE,
}

registerEnumType(PostVisibility, {
	name: 'PostVisibility',
});

@ObjectType()
@Entity()
export class Post extends ExternalEntity {
	@Field(() => PostVisibility)
	@Column({ default: PostVisibility.PUBLIC })
	visibility!: PostVisibility;

	@Field({ nullable: true })
	@Column({ nullable: true })
	title?: string;

	@Field()
	@Column()
	text!: string;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.posts, { lazy: true })
	@TypeormLoader(() => User, (post: Post) => post.userId)
	user!: Lazy<User>;

	@RelationId((post: Post) => post.user)
	userId!: string;

	@OneToMany(() => Favorite, (favorite) => favorite.post, { lazy: true })
	favorites!: Lazy<Favorite[]>;

	@Field(() => [PostMedia])
	@OneToMany(() => PostMedia, (media) => media.post, { lazy: true })
	media!: Lazy<PostMedia[]>;

	@Column({ default: true })
	previewMedia!: boolean;

	@Field(() => [PostComment])
	@OneToMany(() => PostComment, (comment) => comment.post, { lazy: true })
	comments!: Lazy<PostComment[]>;
}
