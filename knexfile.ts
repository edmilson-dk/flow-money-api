//require('dotenv').config();
import pg from 'pg';

pg.defaults.ssl = {
  rejectUnauthorized: false,
}

export default {
  development: {
    client: "pg",
    connection: {
      database: "flow_money",
      user: "dkflowmoney",
      password: "dkflowmoney123",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/drivers/db/knex/postgres/migrations",
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
