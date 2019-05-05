import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';

import logger from './logger';
import apiResponse from './utils/apiResponse';
import { unprotectedRoutes } from './utils/routes';

// routes
import authRoute from './routes/auth.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.secret,
  requestProperty: 'auth',
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', 'Welcome to Instamarket!'));
app.use('/auth', authRoute);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return next(apiResponse(res, 'error', err.message, 401));
  }
  return next(apiResponse(res, 'error', err.message, 500));
});

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
