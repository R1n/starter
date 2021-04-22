module.exports = {
    name: 'default',
    type: process.env.POSTGRES_DB_TYPE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    entities: [
          `${__dirname}/dist/entities/**.js`
    ],
    migrations: [
        "dist/migrations/*.{.ts,.js}",
        "src/migrations/*.{.ts,.js}",
    ],
    logging: false
  }
