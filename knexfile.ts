import dotenv from "dotenv";
dotenv.config();

import pg from 'pg';

pg.defaults.ssl = {
  rejectUnauthorized: false,
}

export default {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: process.env.MIGRATIONS,
      tableName: "knex_migrations"
    }
  },
  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: process.env.MIGRATIONS,
      tableName: "knex_migrations"
    }
  }
};
