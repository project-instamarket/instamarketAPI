exports.up = knex => knex
  .schema.table('users', tbl => {
    tbl.text('access_token');
  });

exports.down = knex => knex
  .schema.table('users', tbl => {
    tbl.dropColumn('access_token');
  });
