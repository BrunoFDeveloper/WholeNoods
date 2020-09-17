import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Lazy } from "../types";
import { ExternalEntity } from "./BaseEntity";
import { Favorite } from "./Favorite";
import { PostMedia } from "./PostMedia";
import { User } from "./User";

// Post media (multiple images / videos)
// Add comments

export enum PostVisibility {
  PUBLIC,
  PRIVATE_PREVIEW,
  PRIVATE,
}

registerEnumType(PostVisibility, {
  name: "PostVisibility",
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
  user!: Lazy<User>;

  @OneToMany(() => Favorite, (favorite) => favorite.post, { lazy: true })
  favorites!: Lazy<Favorite[]>;

  @OneToMany(() => PostMedia, (media) => media.post, { lazy: true })
  media!: Lazy<PostMedia[]>;

  getFavoritesCount() {
    return Favorite.count({ where: { post: this } });
  }
}
