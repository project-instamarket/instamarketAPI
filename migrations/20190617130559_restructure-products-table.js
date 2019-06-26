exports.up = knex => knex
  .schema.table('products', tbl => {
    tbl.text('image_id');
  });

exports.down = knex => knex
  .schema.table('products', tbl => {
    tbl.dropColumn('image_id');
  });
