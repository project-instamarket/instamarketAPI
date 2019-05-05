import request from 'request';
import config from 'lazy-config';
import jwt from 'jsonwebtoken';

// models
import User from '../models/user.model';

// utils
import apiResponse from '../utils/apiResponse';


const {
  audience,
  secret: jwtSecret,
  algo: algorithm
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
      let response;

      const { data } = await request.post(
        igBaseUrl,
        formData
      );
      response = data;

      console.log(response);

      const {
        user: {
          full_name, username, profile_picture // eslint-disable-line camelcase
        }
      } = response;
      const userDetails = { full_name, username, profile_picture };
      let newUser = new User(userDetails);
      const newUserInfo = await newUser.save();
      newUser = newUserInfo.toJSON();

      return jwt.sign(
        {
          ...userDetails
        },
        jwtSecret,
        jwtConfig,
        (err, token) => {
          if (err) {
            return apiResponse(res, 'error', err.message, 400);
          }
          return apiResponse(res, 'success', {
            ...newUser,
            token
          }, 200);
        });
    } catch (error) {
      const message = (error.response && error.response.data) ?
        error.response.data.message : error.message;
      return apiResponse(
        res,
        'failure',
        message || 'Error calling the instagram API'
      );
    }
  }
};

export default AuthCtrl;
