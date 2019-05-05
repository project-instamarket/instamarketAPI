import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfCascadeDelete from 'bookshelf-cascade-delete';

import knexConfig from '../knexfile';


const bookshelfInstance = bookshelf(knex(knexConfig));
bookshelfInstance.plugin(bookshelfCascadeDelete);

export default bookshelfInstance;
