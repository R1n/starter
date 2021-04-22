import Joi, { ObjectSchema, Schema } from '@hapi/joi';
import { Handler } from 'express';
import { SchemaMap } from '@hapi/joi'

interface Options {
    params?: SchemaMap
    body?: SchemaMap
    query?: SchemaMap
}

interface ExpressJoiValidate {
    (schemaOptions: Options): Handler
}

class HapiJoi {
    validateUserSchema(): ObjectSchema<Schema> {
        const schemaUser: ObjectSchema<Schema> = Joi.object({
            name: Joi.string().required().trim(),
            surname: Joi.string().required().trim(),
            age: Joi.number(),
        });

        return schemaUser;
    }

    validate(schema): ObjectSchema<Schema> {
        const obj: Options = {};

        const joiSchema = Joi.object(schema);
        const { error } = joiSchema.validate(obj);

        if (error) {
            const field = error.details[0].path.join('.');
            const message = error.details[0].message.replace(/"/g, "'");

            return { message, field };
        }

        return null;
    }
}

export const hapiJoi = new HapiJoi();