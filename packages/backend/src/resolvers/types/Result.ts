import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Result {
  @Field() ok: boolean;

  constructor(ok: boolean = true) {
    this.ok = ok;
  }
}
