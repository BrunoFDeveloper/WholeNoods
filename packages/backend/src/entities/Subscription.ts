import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User, UserType } from "./User";

@Entity()
@Unique(["fromUser", "toUser"])
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  fromUser!: User;

  @ManyToOne(() => User, (user) => user.subscribers)
  toUser!: User;

  @BeforeInsert()
  async sanityCheck() {
    if (this.fromUser.id === this.toUser.id) {
      throw new Error("You cannot subscribe to yourself");
    }

    if (this.toUser.type !== UserType.CREATOR) {
      throw new Error("You can only subscribe to content creators");
    }
  }
}
