import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';

let createdUserId = null;

describe('API /api/users', () => {
  before(async () => {
    // Conexión a la base
    await mongoose.connect(process.env.MONGO_URL);

    // Eliminar cualquier usuario anterior con ese email
    await userModel.deleteMany({ email: 'testuser@example.com' });

    // Crear usuario de prueba directamente en la base
    const newUser = await userModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: '123456'
    });

    createdUserId = newUser._id.toString();
  });

  after(async () => {
    // Cerrar conexión a Mongo luego de todos los tests
    await mongoose.disconnect();
  });

  it('GET: debería obtener todos los usuarios', async () => {
    const res = await request(app).get('/api/users');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.payload));
  });

  it('GET: debería obtener un usuario por ID', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.payload.email, 'testuser@example.com');
  });

  it('PUT: debería actualizar el usuario', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send({ first_name: 'Updated' });

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'User updated');
  });

  it('DELETE: debería eliminar el usuario', async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'User deleted');
  });
});
