import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import bookshelfUuid from 'bookshelf-uuid';
import bookshelfCascadeDelete from 'bookshelf-cascade-delete';

import knexConfig from '../knexfile';


const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfBcrypt);
bookshelfInstance.plugin(bookshelfUuid);
bookshelfInstance.plugin(bookshelfCascadeDelete);

export default bookshelfInstance;
