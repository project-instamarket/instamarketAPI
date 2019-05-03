import db from '../db';
import Product from './product.model';


export default db.Model.extend({
  tableName: 'users',
  uuid: true,
  products: this.hasMany(Product)
});
