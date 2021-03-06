import { Service, Inject } from 'typedi'
import {Resolver, Query, Mutation, Arg, Args, Int} from "type-graphql";

import {Users, UserResponse, UserCreateInput, UsersCount} from "../entities/User";
import { UserService, IUserService } from '../services/UserService';
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
  public async create (
      @Args() { name, surname, age }: CreateUserArgs
  ): Promise<Users> {
    return this.userService.create({ name, surname, age});
  }

  @Mutation(() => Int)
  async deleteUser(
      @Args() { id }: GetAppByIdArgs
  ) {
    const { affected } = await this.userService.remove(id);
    return affected === 1 ? id : 0
  }

  @Mutation(() => Users)
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

  @Query(type => UsersCount)
  async getAllUsers(
      @Args() {startRow, pageSize, orderBy, query}:  GetAllArgs
) {
    return this.userService.findAll(startRow, pageSize, orderBy, query);
  }
}


