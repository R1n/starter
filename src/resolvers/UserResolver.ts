import { Service, Inject } from 'typedi'
import {Resolver, Query, Mutation, Arg, Args} from "type-graphql";

import { Users, UserResponse, UserCreateInput } from "../entities/User";
import { UserService, IUserService } from '../controllers/UserController';
import  GetAppByIdArgs  from '../inputs/GetAppByIdArgs';
import  GetAllArgs  from '../inputs/GetAllArgs';
import  CreateUserArgs  from '../inputs/CreateUserArgs';

@Service()
@Resolver()
export class UserResolver {
  constructor (
      @Inject(() => UserService)
      private userService: IUserService
  ) {
  }

  @Mutation(() => Users)
  public async createApp (
      @Args() { name, surname, age }: CreateUserArgs
  ): Promise<Users> {
    return this.userService.create({name, surname, age});
  }

  @Mutation(() => Boolean)
  async deleteUser(
      @Args() { id }: GetAppByIdArgs
  ) {
    return this.userService.remove(id);
  }

  @Mutation(() => UserResponse)
  async updateUser(
      @Args() { id }: GetAppByIdArgs,
      @Arg('updateUserBody', () => UserCreateInput) updateUserBody: UserCreateInput) {
    return this.userService.update(id, updateUserBody);
  }

  @Query(() => Users)
  async getById(
      @Args() { id }: GetAppByIdArgs
  ) {
    const user = await this.userService.findById(id) as Users;
    return user;
  }

  @Query(() => [Users])
  getAllUsers(
      @Args() {startRow, pageSize, orderBy, query}:  GetAllArgs
) {
    return this.userService.findAll(startRow, pageSize, orderBy, query);
  }
}


