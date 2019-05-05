const tblName = 'product-orders';

const createTable = knex => knex.schema
  .createTable(tblName, (tbl) => {
    // PK
    tbl.increments();
    // other fields
    tbl.integer('user_id').references('id').inTable('users');
    tbl.integer('product_id').references('id').inTable('products');
    tbl.timestamps(false, true);
  });

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && createTable(knex));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
