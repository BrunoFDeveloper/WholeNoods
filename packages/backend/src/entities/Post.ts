import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lazy } from "../types";
import { User } from "./User";

// Post media (multiple images / videos)
// Remove rich text because I think its too much for now. (remove draftjs)
// Add likes
// Add comments
// Build a timeline
// Add dates (created / updated)
// Add a pinned post
// Add post visibility (public, previewed, private)

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @ManyToOne(() => User, (user) => user.posts, { lazy: true })
  user!: Lazy<User>;
}
