const tblName = 'products';

const createTable = knex => knex.schema
  .createTable(tblName, (tbl) => {
    // PK
    tbl.uuid('id').notNullable().primary();
    // other fields
    tbl.text('description').notNullable();
    tbl.text('name').notNullable();
    tbl.jsonb('hashtags').notNullable();
    tbl.text('product_image').notNullable();
    tbl.uuid('user_id').references('id').inTable('users');
    tbl.timestamps(false, true);
    tbl.unique(['user_id', 'name']);
  });

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && createTable(knex));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
