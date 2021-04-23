import { ArgsType, Field } from 'type-graphql'
import { Matches } from 'class-validator'

@ArgsType()
class CreateUserArgs {
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
