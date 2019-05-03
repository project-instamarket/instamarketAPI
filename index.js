import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';

import logger from './logger';
import {
  apiResponse,
  unprotectedRoutes
} from './utils';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { isDev, app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.jwtSecret,
  requestProperty: 'auth',
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', 'Welcome to Instamarket!'));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return next(apiResponse(res, 'error', err.message, 401));
  }
});

if (isDev) {
  /* eslint-disable global-require */
  app.use(require('koii'));
  /* eslint-enable */
}

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
