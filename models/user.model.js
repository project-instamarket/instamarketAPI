import db from '../db';
import Product from './product.model';


export default db.Model.extend({
  tableName: 'users',
  products() {
    this.hasMany(Product);
  }
});
