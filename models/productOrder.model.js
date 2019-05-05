import db from '../db';
import User from './user.model';
import Product from './product.model';


export default class Model extends db.Model {
  get tableName() {
    return 'product-orders';
  }

  buyer = () => this.belongsTo(User);

  product = () => this.belongsTo(Product);
}
