import { InputType, Int, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  
  @Field()
  login!: string;

  @Field()
  password!: string;

  @Field()
  firstname: string;

  @Field()
  secondname: string;

  @Field()
  lastname: string;

  @Field()
  @IsUUID()
  uid: string;

  @Field()
  isActive!: boolean;
}
