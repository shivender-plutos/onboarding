/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()
  await knex('customers').insert([
    {firstname:'Rowan', lastname:'Salinas', phone_no:'9711879456', age:24 ,state:'Delhi'},
    {firstname:'Gavin', lastname:'Cummings', phone_no:'9611273276', age:32 ,state:'Gujrat'},
    {firstname:'Marvin', lastname:'Curtis', phone_no:'9811568325', age:27 ,state:'Delhi'},
    {firstname:'Bernard', lastname:'Pennington', phone_no:'9256374839', age:25 ,state:'Punjab'},
    {firstname:'Cameron', lastname:'Santos', phone_no:'9725479433', age:29 ,state:'Uttar Pradesh'},
  ]);
};
