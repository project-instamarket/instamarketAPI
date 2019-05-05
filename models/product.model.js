import db from '../db';
import User from './user.model';


export default db.Model.extend({
  tableName: 'products',
  owner: () => this.belongsTo(User)
});
