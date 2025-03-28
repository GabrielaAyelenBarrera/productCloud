import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import petModel from '../src/dao/models/Pet.js';

let createdPetId = null;

describe('API /api/pets', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    await petModel.deleteMany({ name: 'TestPet' }); // limpieza previa
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('POST: debería crear una nueva mascota', async () => {
    const newPet = {
      name: 'TestPet',
      specie: 'Perro',
      birthDate: '2020-01-01'
    };

    const res = await request(app).post('/api/pets').send(newPet);
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'success');
    assert.ok(res.body.payload._id);

    createdPetId = res.body.payload._id;
  });

  it('GET: debería obtener todas las mascotas', async () => {
    const res = await request(app).get('/api/pets');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.payload));
  });

  it('PUT: debería actualizar una mascota', async () => {
    const res = await request(app)
      .put(`/api/pets/${createdPetId}`)
      .send({ adopted: true });

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'pet updated');
  });

  it('DELETE: debería eliminar la mascota', async () => {
    const res = await request(app).delete(`/api/pets/${createdPetId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'pet deleted');
  });
});
