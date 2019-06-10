exports.up = knex => knex
  .schema.table('users', tbl => {
    tbl.text('bio');
  });

exports.down = knex => knex
  .schema.table('users', tbl => {
    tbl.dropColumn('bio');
  });
