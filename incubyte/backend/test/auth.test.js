const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {

  const uniqueUser = `user_${Date.now()}`;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: uniqueUser,
        password: 'password123',
        role: 'user'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Registered');
  });

  it('should login registered user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: uniqueUser,
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});
