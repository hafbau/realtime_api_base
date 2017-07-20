const request = require('request-promise-native');
const { User } = require('../models');
const hostUrl = 'http://localhost:3000';

describe('Testing Authentication Routes', () => {

  const userMock = {
    name: { first: 'ishola', last: 'suara'},
    email: 'matin@yahoo.com',
    password: 'password'
  }

  let user, token;

  it('should register with email', () => {
    request({
      form: {
        name: { first: 'ishola', last: 'suara'},
        email: 'matin@yahoo.com',
        password: 'password'
      },
      json: true,
      method: 'POST',
      uri: `${hostUrl}/register`,
    })
    .then(response => {
      user = response.user;
      token = response.token;
      expect(user).toBeDefined();

      expect(userMock.email).toEqual(user.email);
      expect(token).toBe(true);
    })
    .catch (err => console.log("request error", err.message))

  });

  xit('', () => {

  })
})
