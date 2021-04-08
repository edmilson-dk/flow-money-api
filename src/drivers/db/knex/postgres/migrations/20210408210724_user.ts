import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      return knex.schema.createTable('users', table => {
        table.string('id').notNullable();
        table.string('name', 80).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password', 80).notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('users');
}