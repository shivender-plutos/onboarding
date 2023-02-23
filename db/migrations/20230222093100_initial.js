/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('customers', function(table){
        table.increments('id').notNullable().primary();
        table.string('firstname').notNullable();
        table.string('lastname');
        table.string('phone_no').notNullable().unique();
        table.integer('age').notNullable();
        table.string('state').notNullable();
    })
    .createTableIfNotExists('vouchers', function(table){
      table.increments('id').notNullable().primary();
      table.string('voucher_code').notNullable();
      table.string('coupon_code').notNullable().unique();
      table.string('brand_name');
      table.string('type').notNullable();
      table.datetime('expiry_date').notNullable();
      table.integer('discount').notNullable();
  })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customers')
                    .dropTableIfExists('vouchers');
};
