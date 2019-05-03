const config = require('lazy-config');

module.exports = {
  client: 'pg',
  connection: {
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    host: config.db.host
  },
  pool: { min: 2, max: 10 },
  migrations: { tableName: 'knex_migrations' }
};
