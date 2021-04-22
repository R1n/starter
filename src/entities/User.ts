import { InputType, ObjectType, Field } from 'type-graphql'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'
import { Int } from "type-graphql/dist/scalars";
import { createUnionType } from 'type-graphql'

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "date", default: "NOW()" })
  created_at = new Date();

  @Field(() => String)
  @Column({ type: "date", default: "NOW()" })
  updated_at = new Date();

  @Field(() => String)
  @Column({ type: "text" })
  name!: string;

  @Field(() => String)
  @Column({nullable: true})
  surname!: string;

  @Field(() => Number)
  @Column({nullable: true})
  age: number;
}

@ObjectType()
export class UserNotFound {
  @Field()
  code: number = 404;

  @Field()
  message: string = "User not found";
}


@InputType()
export class UserCreateInput {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  surname: string;
}

export const UserResponse = createUnionType({
  name: "UserResponse",
  types: () => [User, UserNotFound],
  resolveType: (value) => {
    return "id" in value ? User : UserNotFound;
  },
});
