import { ArgsType, Field, Int } from 'type-graphql'
import { IsInt } from 'class-validator'
import { GraphQLJSONObject } from 'graphql-type-json'

@ArgsType()
class GetAllArgs {
    @Field(() => Int)
    @IsInt({ message: "'startRow' value should be a positive integer" })
    startRow: number

    @Field(() => Int)
    @IsInt({ message: "'startRow' value should be a positive integer" })
    pageSize: number

    @Field()
    orderBy: string

    @Field(() => GraphQLJSONObject)
    query: object

}

export default GetAllArgs
