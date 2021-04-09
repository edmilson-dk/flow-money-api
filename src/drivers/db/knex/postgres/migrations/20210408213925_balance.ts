import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable('balances').then(exists => {
    if (!exists) {
      return knex.schema.createTable('balances', table => {
        table.decimal('joined').notNullable();
        table.decimal('left').notNullable();
        table.decimal('total').notNullable().unique();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.string('user_id')
          .references('users.id')
          .notNullable()
          .onDelete('CASCADE');
      });
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('balances');
}