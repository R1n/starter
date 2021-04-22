import { ArgsType, Field, Int } from 'type-graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
class GetAppByIdArgs {
    @Field(() => Int)
    @IsInt({ message: "'id' value should be a positive integer" })
    @Min(1, { message: "'id' value should be a positive integer" })
    id: number
}

export default GetAppByIdArgs
