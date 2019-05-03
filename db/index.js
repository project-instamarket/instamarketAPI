import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfUuid from 'bookshelf-uuid';
import bookshelfCascadeDelete from 'bookshelf-cascade-delete';

import knexConfig from '../knexfile';


const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfUuid, { type: 'v4' });
bookshelfInstance.plugin(bookshelfCascadeDelete);

export default bookshelfInstance;
