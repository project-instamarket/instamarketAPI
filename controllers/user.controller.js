import config from 'lazy-config';
import axios from 'axios';

// models
import User from '../models/user.model';

// utils
import apiResponse from '../utils/apiResponse';
import { normalizeMediaObject } from '../utils/media.util';


const UserCtrl = {
  async findUser(userInfo) {
    try {
      const userDetails = await User.where(userInfo).fetch();
      return userDetails.toJSON();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async findOrCreate(userInfo) {
    const { instagram_id } = userInfo;
    let user;

    try {
      user = await User.where({ instagram_id }).fetch();

      if (!user) {
        user = await new User(userInfo).save();
      }
    } catch (error) {
      return Promise.reject(error);
    }

    const { profile_picture, username, full_name, email } = user;

    return { profile_picture, username, full_name, instagram_id, email };
  },

  async fetchUserMedia(req, res) {
    try {
      const { baseUrl: igBaseUrl } = config.instagram;
      const { instagram_id } = req.auth;
      const { access_token, id: user_id } = await UserCtrl.findUser({ instagram_id });
      const mediaUrl = `${igBaseUrl}/v1/users/self/media/recent?access_token=${access_token}`;
      const { data: mediaData } = await axios.get(mediaUrl);

      if (mediaData.meta.code === 200) {
        const userMedia = normalizeMediaObject(mediaData.data, user_id);
        return apiResponse(res, 'success', userMedia);
      }

      return apiResponse(res, 'error', 'Error fetching user media. Please try again.', 400);
    } catch (error) {
      const message = (error.response && error.response.data) ?
        error.response.data.message : error.message;
      const errorMessage = message || 'Error calling the instagram API';
      return apiResponse(res, 'error', errorMessage, 400);
    }
  }
};

export default UserCtrl;
