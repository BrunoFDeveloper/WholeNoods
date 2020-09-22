import groupBy from "lodash/groupBy";
import { ObjectType } from "type-graphql";
import { Entity, In, ManyToOne, RelationId, Unique } from "typeorm";
import { Lazy } from "../types";
import { ExternalEntity } from "./BaseEntity";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
@Unique(["user", "post"])
export class Favorite extends ExternalEntity {
  static async findCountForPosts(ids: readonly number[]) {
    const favorites = await this.createQueryBuilder("favorite")
      .select([
        `"favorite"."postId" as post_id`,
        `COUNT("favorite"."id") as count`,
      ])
      .where(`"favorite"."postId" IN (:...ids)`, { ids })
      .groupBy(`"favorite"."postId"`)
      .getRawMany();

    return ids.map(
      (id) =>
        favorites.find((fav) => String(fav.post_id) === String(id))?.count ?? 0
    );
  }

  @ManyToOne(() => User, (user) => user.favorites, { lazy: true })
  user!: Lazy<User>;

  @ManyToOne(() => Post, (post) => post.favorites, { lazy: true })
  post!: Lazy<Post>;

  @RelationId((favorite: Favorite) => favorite.post)
  postId!: number;
}
