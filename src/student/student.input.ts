import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(3)
  @Field()
  firstname: string;

  @MinLength(3)
  @Field()
  lastname: string;
}
