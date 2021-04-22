import { validate } from "class-validator";
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { DeleteResult, UpdateResult, Repository, SelectQueryBuilder } from "typeorm";
import { ApolloError, UserInputError } from 'apollo-server-express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Users, UserCreateInput } from '../entities/User';

export interface IUserService {
    create (user: UserCreateInput): Users
    findById (id: number): Promise<Users>
    findAll (startRow: number,
             pageSize: number,
             orderBy: string,
             query): Promise<[any[], number]>
    update (id: number, UserCreateInput): Promise<UpdateResult>
    remove (id: number): Promise<DeleteResult>

}

@Service()
export class UserService implements IUserService {

    private orderByDefault: string = 'name asc';

    constructor(
    @InjectRepository(Users, process.env.DB_CONNECTION)
    private usersRepository: Repository<Users>,
    ) {
    }

    create(user: UserCreateInput) {
        return this.usersRepository.create(user);
    }

    async findById(id: number) {
        try{
            const user = await this.usersRepository.findOne(+id);
            if (!user) {
                throw new ApolloError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND.toString());
            }
            return user;
        } catch(ex) {
            throw new ApolloError(ex.message, ex.status);
        }
    }

    async findAll(startRow: number,
                  pageSize: number,
                  orderBy: string,
                  query,
                  ) {
        if (!orderBy) orderBy = this.orderByDefault;
        const qb: SelectQueryBuilder<Users> = this.usersRepository
            .createQueryBuilder()
            .skip(startRow)
            .take(pageSize);

        if (query['name']) {
            qb
                .andWhere('name like :name')
                .setParameter('name', '%' + query['name'] + '%');
        }
        if (query['surname']) {
            qb
                .andWhere('surname like :surname')
                .setParameter('surname', '%' + query['surname'] + '%');
        }
        const result = await qb.orderBy('name', "ASC").getManyAndCount();
        console.log(result);
        return result;
    }

    update(id: number, updateUserBody: UserCreateInput) {
        // const user = this.usersRepository.create(updateUserBody);
        // const errors = await validate(user, { stopAtFirstError: false });
        // if (errors.length) {
        //     throw new UserInputError(errors);
        // }

        return this.usersRepository.update(+id, updateUserBody);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
