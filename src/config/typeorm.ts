import { createConnection, useContainer } from 'typeorm';
import config from '../../ormconfig'

import { Container } from 'typedi';

/** Tell TypeORM to use the TypeDI container to resolve it's dependencies. */
export const connect = async() => {
    useContainer(Container);

    await createConnection({type: "postgres", ...config});
    console.log(`Database ${config.database} is connected.`);
};