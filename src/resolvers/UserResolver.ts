import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';

import { User, UserResponse, UserCreateInput } from "../entities/User";
import { UserController } from '../controllers/UserController';

@Resolver()
export class UserResolver {
  constructor (
      @InjectRepository(User, process.env.DB_CONNECTION)
      private appRepo: Repository<User>,
      @Inject(() => UserController)
      private userController,
  ) {
  }

  @Mutation(() => User)
  async createUser(@Arg('variables', () => UserCreateInput) variables: UserCreateInput) {
    return this.userController.createUser(variables);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Number) id: number) {
    return this.userController.deleteUser(id);
  }

  @Mutation(() => UserResponse)
  async updateUser(
      @Arg('id', () => Number) id: number,
      @Arg('fields', () => UserCreateInput) fields: UserCreateInput) {
    return this.userController.updateUser(id, fields);
  }

  @Query(() => [User])
  getById(
      @Arg('id', () => String) id: string,
  ) {
    return this.userController.findById(id);
  }

  @Query(() => [User])
  getAllUsers() {
    return this.userController.findAll();
  }
}


