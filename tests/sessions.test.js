import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';

let cookie = null;

describe('API /api/sessions', () => {
  const testUser = {
    first_name: 'Session',
    last_name: 'Test',
    email: 'sessiontest@example.com',
    password: '123456'
  };

  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    await userModel.deleteMany({ email: testUser.email });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('POST /register: debería registrar un nuevo usuario', async () => {
    const res = await request(app).post('/api/sessions/register').send(testUser);
    assert.equal(res.status, 200);
    assert.ok(res.body.payload);
  });

  it('POST /login: debería loguear al usuario y setear cookie', async () => {
    const res = await request(app).post('/api/sessions/login').send({
      email: testUser.email,
      password: testUser.password
    });

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'Logged in');

    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie);

    // Guardamos la cookie para usar en el siguiente test
    cookie = setCookie.find(c => c.startsWith('coderCookie'));
    assert.ok(cookie);
  });

  it('GET /current: debería devolver el usuario logueado usando cookie', async () => {
    const res = await request(app)
      .get('/api/sessions/current')
      .set('Cookie', cookie);

    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'success');
    assert.equal(res.body.payload.email, testUser.email);
  });

  it('POST /login: debería fallar con password incorrecta', async () => {
    const res = await request(app).post('/api/sessions/login').send({
      email: testUser.email,
      password: 'wrongpass'
    });

    assert.equal(res.status, 400);
    assert.equal(res.body.error, 'Incorrect password');
  });

  it('POST /login: debería fallar si el usuario no existe', async () => {
    const res = await request(app).post('/api/sessions/login').send({
      email: 'nonexistent@example.com',
      password: 'whatever'
    });

    assert.equal(res.status, 404);
    assert.equal(res.body.error, "User doesn't exist");
  });
});
