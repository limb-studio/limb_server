import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID, {nullable: true})
  id?: number;

  @Field({ nullable: true })
  name?: string;
}