import { Service, Inject } from 'typedi'
import {Resolver, Query, Mutation, Arg, Args, Int} from "type-graphql";
import { DeleteResult, UpdateResult, Repository, SelectQueryBuilder } from "typeorm";

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
  public async create (
      @Args() { id, name, surname, age }: CreateUserArgs
  ): Promise<Users> {
    return this.userService.create({id, name, surname, age});
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

  @Query(() => [Users])
  getAllUsers(
      @Args() {startRow, pageSize, orderBy, query}:  GetAllArgs
) {
    return this.userService.findAll(startRow, pageSize, orderBy, query);
  }
}


