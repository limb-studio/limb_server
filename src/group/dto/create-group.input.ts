import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Group } from '../entities/group.entity';

@InputType()
export class CreateGroupInput {

  @Field()
  name!: string;

  @Field()
  ownerUid!: string;

  @Field()
  type!: number;

  @Field()
  uid: string;

  @Field()
  isActive!: boolean;
}
