const tblName = 'users';

const createTable = knex => knex.schema
  .createTable(tblName, (tbl) => {
    // PK
    tbl.increments();
    // other fields
    tbl.text('full_name').notNullable();
    tbl.text('username').notNullable();
    tbl.text('instagram_id').unique().notNullable();
    tbl.text('email').unique().comment('This is the email field');
    tbl.string('phone', 60).unique();
    tbl.text('profile_picture');
    tbl.timestamps(false, true);
  });

exports.up = knex => knex
  .schema.hasTable(tblName)
  .then(exists => !exists && createTable(knex));

exports.down = knex => knex
  .schema.dropTableIfExists(tblName);
