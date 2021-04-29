import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable('transactions').then(exists => {
    if (!exists) {
      return knex.schema.createTable('transactions', table => {
        table.string("id").notNullable();
        table.decimal('value').notNullable();
        table.boolean('is_decrement').notNullable();
        table.string('title', 80).notNullable().unique();
        table.string('category', 80).notNullable();
        
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.string('user_id')
          .references('users.id')
          .notNullable()
          .onDelete('CASCADE');
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('transactions');
}