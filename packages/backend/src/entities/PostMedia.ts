import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Lazy } from "../types";
import { ExternalEntity } from "./utils/Base";
import { Post } from "./Post";

export enum PostMediaType {
  PHOTO,
  VIDEO,
}

registerEnumType(PostMediaType, {
  name: "PostMediaType",
});

@ObjectType()
@Entity()
export class PostMedia extends ExternalEntity {
  @Column()
  @Field()
  type!: PostMediaType;

  @ManyToOne(() => Post, (post) => post.media, { lazy: true })
  post!: Lazy<Post>;

  @Column()
  @Field()
  url!: string;
}
