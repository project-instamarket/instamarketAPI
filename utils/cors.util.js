const whitelist = [
  'http://proton-dev.com:3000',
  'localhost:3000',
  'http://instamarket-frontend.herokuapp.com',
  'https://instamarket-frontend.herokuapp.com'
];

export default {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) < 0) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
