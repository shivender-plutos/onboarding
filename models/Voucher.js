const {Model} = require('objection');
const knex = require('../db/db');

Model.knex(knex);

class Voucher extends Model{
    static get tableName(){
        return 'vouchers'
    }
}

module.exports = Voucher