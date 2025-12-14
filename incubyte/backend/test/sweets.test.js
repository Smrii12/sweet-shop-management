const request = require('supertest');
const app = require('../app');

let adminToken;
let userToken;
let sweetId;

describe('Sweets API', () => {

  // 🔹 Register & login users before tests
  beforeAll(async () => {
    // Register admin
    await request(app).post('/api/auth/register').send({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    // Register user
    await request(app).post('/api/auth/register').send({
      username: 'user',
      password: 'user123',
      role: 'user'
    });

    // Login admin
    const adminRes = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'admin123'
    });
    adminToken = adminRes.body.token;

    // Login user
    const userRes = await request(app).post('/api/auth/login').send({
      username: 'user',
      password: 'user123'
    });
    userToken = userRes.body.token;
  });

  // 🔹 Admin adds a sweet
  test('Admin should add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Kaju Katli',
        category: 'Dry Sweets',
        price: 500,
        quantity: 10
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();
    sweetId = res.body.id;
  });

  // 🔹 User cannot add a sweet
  test('User should NOT be allowed to add a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Ladoo',
        category: 'Festive',
        price: 300,
        quantity: 5
      });

    expect(res.statusCode).toBe(403);
  });

  // 🔹 Get all sweets
  test('User should fetch sweets list', async () => {
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 🔹 Purchase sweet
  test('User should purchase a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Purchased');
  });

});
