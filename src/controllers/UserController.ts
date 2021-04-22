import { validate } from "class-validator";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ApolloError, UserInputError } from 'apollo-server-express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User } from '../entities/User';

export class UserController {

    private orderByDefault: string = 'name asc';

    constructor(private usersRepository: Repository<User>) {
    }

    create(user: User) {
        return this.usersRepository.create(user);
    }

    findById(id: string) {
        return this.usersRepository.findOne(+id)
            .then(user => {
                if (!user) {
                    throw new ApolloError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND.toString());
                }
                return user;
            }).catch(ex => {
                throw new ApolloError(ex.message, ex.status);
            });
    }

    async findAll(startRow: number,
                  pageSize: number,
                  orderBy: String,
                  query,
                  ) {
        if (!orderBy) orderBy = this.orderByDefault;
        const qb: SelectQueryBuilder<User> = this.usersRepository
            .createQueryBuilder()
            .skip(startRow)
            .take(pageSize);
        if (query['like.name']) {
            qb
                .andWhere('name like :name')
                .setParameter('name', '%' + query['like.name'] + '%');
        }
        if (query['like.surname']) {
            qb
                .andWhere('surname like :surname')
                .setParameter('surname', '%' + query['like.surname'] + '%');
        }
        const result = await qb.orderBy('name', "ASC").getManyAndCount();
        return result;
    }

    update(id: string, updateUserBody: User) {
        // const user = this.usersRepository.create(updateUserBody);
        // const errors = await validate(user, { stopAtFirstError: false });
        // if (errors.length) {
        //     throw new UserInputError(errors);
        // }

        return this.usersRepository.update(+id, updateUserBody);
    }

    remove(id: string) {
        return this.usersRepository.delete(+id);
    }
}
