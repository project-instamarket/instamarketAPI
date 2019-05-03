import db from '../db';
import User from './user.model';
import Product from './product.model';


export default class Model extends db.Model {
  get tableName() {
    return 'product-orders';
  }

  get uuid() {
    return true;
  }

  buyer = () => this.belongsTo(User);

  product = () => this.belongsTo(Product);
}
