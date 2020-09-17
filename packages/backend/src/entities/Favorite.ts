import { ObjectType } from "type-graphql";
import { Entity, ManyToOne, Unique } from "typeorm";
import { Lazy } from "../types";
import { ExternalEntity } from "./BaseEntity";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
@Unique(["user", "post"])
export class Favorite extends ExternalEntity {
  @ManyToOne(() => User, (user) => user.favorites, { lazy: true })
  user!: Lazy<User>;

  @ManyToOne(() => Post, (post) => post.favorites, { lazy: true })
  post!: Lazy<Post>;
}
