const whitelist = [
  'http://proton-dev.com:3000',
  'localhost:3000'
];

export default {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
