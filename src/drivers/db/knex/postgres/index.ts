const environment: string = process.env.NODE_ENV as string || 'development';

import knexfile from "../../../../../knexfile";
import knex from 'knex';

const knexConfig = environment === 'development' 
  ? knexfile.development 
  : knexfile.production;

const db = knex(knexConfig);

export default db;