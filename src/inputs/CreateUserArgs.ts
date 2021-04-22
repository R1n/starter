import {ArgsType, Field, Int} from 'type-graphql'
import {IsInt, Matches, Min} from 'class-validator'

@ArgsType()
class CreateUserArgs {
    @Field(() => Int)
    @IsInt({ message: "'id' value should be a positive integer" })
    @Min(1, { message: "'id' value should be a positive integer" })
    id: number

    @Field()
    @Matches(/^[a-zA-Z_ ]*$/, { message: "Username should only contain letters, numbers and underscore" })
    name: string

    @Field({ defaultValue: '' })
    @Matches(/^[a-zA-Z_ ]*$/, { message: "Username should only contain letters, numbers and underscore" })
    surname: string

    @Field({ defaultValue: 0 })
    @Matches(/^\d+$/, { message: "Age should only contain numbers" })
    age: number
}

export default CreateUserArgs
