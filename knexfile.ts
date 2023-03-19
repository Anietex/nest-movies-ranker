import * as dotenv from 'dotenv';
dotenv.config();
import { Knex } from 'knex';
const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: { min: 0, max: 7 },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`,
    extension: 'ts',
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};

export default config;
