/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('customers', function(table){
        table.increments('id').notNullable().primary();
        table.string('firstname').notNullable();
        table.string('lastname');
        table.string('phone_no').notNullable().unique();
        table.integer('age').notNullable();
        table.string('state').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customers');
};
