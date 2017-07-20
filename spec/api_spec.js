const frisby = require('frisby');
const baseUrl = 'http://localhost:3000';

describe('Testing Authentication Routes', () => {

  const userMock = {
    name: { first: 'ishola', last: 'suara'},
    email: 'matin@yahoo.com',
    password: 'password'
  }

  let user, token;

  it('should register with email', () => {

    frisby.create('should register with email')
      .post(`${baseUrl}/register`, userMock, { json: true })
      .expectJSON('user', {

        email: userMock.email,
        name: userMock.name

      })
      // .afterJSON(res => {
      //   expect(token).not.toBeDefined();
      //   expect(res.token).toBeDefined();
      //
      //   expect(res.user).toBeDefined();
      //   token = res.token;
      //   expect(token).toBeDefined();
      // })
      .toss()
  });

  it('should log in with right credential', () => {
    frisby.create('should log in with right credential')
      .post(`${baseUrl}/login`, { email: userMock.email, password: userMock.password })
      .expectJSON('user', {

        email: userMock.email,
        name: userMock.name

      })
      .toss()
  })

});
