const tblName = 'users';

const createTable = knex => knex.schema
  .createTable(tblName, (tbl) => {
    // PK
    tbl.uuid('id').notNullable().primary();
    // other fields
    tbl.text('full_name').notNullable();
    tbl.text('username').notNullable();
    tbl.text('email').notNullable().unique().comment('This is the email field');
    tbl.string('phone', 60).unique();
    tbl.text('profile_picture').notNullable();
    tbl.timestamps(false, true);
  });

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && createTable(knex));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
