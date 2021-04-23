import { validate } from "class-validator";
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { DeleteResult, UpdateResult, Repository, SelectQueryBuilder } from "typeorm";
import { ApolloError, UserInputError } from 'apollo-server-express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Users, UserCreateInput } from '../entities/User';

export interface IUserService {
    create (user: UserCreateInput): Promise<Users>
    findById (id: number): Promise<Users>
    findAll (startRow: number,
             pageSize: number,
             orderBy: string,
             query): Promise<{data: Users[], total: number}>
    update (id: number, UserCreateInput): Promise<UpdateResult>
    remove (id: number): Promise<DeleteResult>

}

@Service()
export class UserService implements IUserService {

    constructor(
    @InjectRepository(Users, process.env.DB_CONNECTION)
    private usersRepository: Repository<Users>,
    ) {
    }

    async create(user: Users) {
        const createdUser = await this.usersRepository.create(user)
        return await this.usersRepository.save(createdUser);
    }

    async findById(id: number) {
        try{
            const user = await this.usersRepository.findOne(id);
            if (!user) {
                throw new ApolloError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND.toString());
            }
            return user;
        } catch(ex) {
            throw new ApolloError(ex.message, ex.status);
        }
    }

    async findAll(startRow, pageSize, orderBy: 'ASC' | 'DESC' = 'ASC', query) {
        const qb: SelectQueryBuilder<Users> = this.usersRepository
            .createQueryBuilder()
            .skip(startRow)
            .take(pageSize);

        let sortBy;
        if (query['name']) {
            sortBy = 'name';

            qb
                .andWhere('name like :name')
                .setParameter('name', '%' + query['name'] + '%');
        }
        if (query['surname']) {
            sortBy = 'surname';

            qb
                .andWhere('surname like :surname')
                .setParameter('surname', '%' + query['surname'] + '%');
        }

        const [data, total] = await qb.orderBy(sortBy, orderBy).getManyAndCount();

        return {
            data,
            total,
        };
    }

    update(id: number, updateUserBody: UserCreateInput) {
        return this.usersRepository.update(id, updateUserBody);
    }

    async remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
