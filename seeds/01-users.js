const R = require('ramda');
const ngFaker = require('ng-faker');

let userId = 0;
const users = R.times(() => {
  userId += 1;
  return ({
    id: userId,
    full_name: ngFaker.name.fullName(),
    instagram_id: `${ngFaker.lorem.word()}${ngFaker.random.hexadecimal()}`,
    username: `${ngFaker.lorem.word()}${ngFaker.random.hexadecimal()}`,
    email: ngFaker.internet.email(),
    phone: ngFaker.phone.phoneNumber(),
    profile_picture: 'https://cdn.pixabay.com/photo/2019/04/08/20/38/dog-4112950_1280.jpg',
    created_at: new Date(),
    updated_at: new Date()
  });
}, 10);
const tblName = 'users';

exports.seed = knex => knex(tblName)
  .del()
  .then(() => knex.insert(users).into(tblName));
