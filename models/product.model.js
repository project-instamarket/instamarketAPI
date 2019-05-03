import db from '../db';
import User from './user.model';


export default db.Model.extend({
  tableName: 'products',
  uuid: true,
  owner: () => this.belongsTo(User)
});
