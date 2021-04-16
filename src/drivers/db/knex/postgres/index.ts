const environment = process.env.NODE_ENV as string || 'development';

import knexfile from "../../../../../knexfile"
import knex from 'knex';

let knexConfig = environment === 'development' 
  ? knexfile.development 
  : knexfile.production;

knexConfig = environment === 'test' ? knexfile.test : knexConfig;

const db = knex(knexConfig);

export default db;