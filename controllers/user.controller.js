import User from '../models/user.model';

const UserCtrl = {
  async findOrCreate(userInfo) {
    const { instagram_id } = userInfo;
    let user;
    user = await User.where({ instagram_id }).fetch();

    if (!user) {
      user = await new User(userInfo).save();
    }

    return user;
  }
};

export default UserCtrl;
