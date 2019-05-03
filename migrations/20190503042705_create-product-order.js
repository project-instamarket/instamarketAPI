const tblName = 'product-orders';

const createTable = knex => knex.schema
  .createTable(tblName, (tbl) => {
    // PK
    tbl.uuid('id').notNullable().primary();
    // other fields
    tbl.uuid('user_id').references('id').inTable('users');
    tbl.uuid('product_id').references('id').inTable('products');
    tbl.timestamps(false, true);
  });

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && createTable(knex));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
