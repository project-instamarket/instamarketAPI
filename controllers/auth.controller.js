import request from 'request-promise';
import config from 'lazy-config';
import jwt from 'jsonwebtoken';

// controllers
import UserCtrl from './user.controller';

// utils
import apiResponse from '../utils/apiResponse';


const {
  audience, secret: jwtSecret, algo: algorithm
} = config.authentication;
const jwtConfig = {
  expiresIn: '24h',
  algorithm,
  audience
};

const AuthCtrl = {
  async authenticate(req, res) {
    try {
      const { code, error } = req.body;

      if (error) {
        return apiResponse(res, 'succcess', 'done');
      }

      const { baseUrl: igBaseUrl, clientId, clientSecret, redirectUri } = config.instagram;
      const formData = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      };

      const options = {
        uri: `${igBaseUrl}/oauth/access_token`,
        formData
      };

      const response = await request.post(options);

      const {
        user: { full_name, username, profile_picture, id: instagram_id },
        access_token
      } = JSON.parse(response);
      const userDetails = { full_name, username, profile_picture, instagram_id };

      await UserCtrl.findOrCreate({ ...userDetails, access_token });

      return jwt.sign(
        userDetails,
        jwtSecret,
        jwtConfig,
        (err, token) => {
          if (err) {
            return apiResponse(res, 'error', err.message, 400);
          }
          return apiResponse(res, 'success', { token }, 200);
        });
    } catch (error) {
      const message = (error.response && error.response.data) ?
        error.response.data.message : error.message;
      return apiResponse(res, 'error', message || 'Error calling the instagram API', 400);
    }
  }
};

export default AuthCtrl;
