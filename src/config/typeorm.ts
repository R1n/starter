import {createConnection} from 'typeorm'
import config from '../../ormconfig'

export const connect = async() => {
    await createConnection({type: "postgres", ...config});
    console.log(`Database ${config.database} is connected.`);
};