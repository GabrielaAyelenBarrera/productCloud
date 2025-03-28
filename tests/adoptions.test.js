import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import adoptionModel from '../src/dao/models/Adoption.js';

let userId = null;
let petId = null;
let adoptionId = null;

describe('API /api/adoptions', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);

    // Limpieza
    await userModel.deleteMany({ email: 'adoptiontest@example.com' });
    await petModel.deleteMany({ name: 'AdoptionPet' });
    await adoptionModel.deleteMany({});

    // Crear usuario
    const user = await userModel.create({
      first_name: 'Adoptante',
      last_name: 'Test',
      email: 'adoptiontest@example.com',
      password: '123456'
    });
    userId = user._id.toString();

    // Crear mascota
    const pet = await petModel.create({
      name: 'AdoptionPet',
      specie: 'Gato',
      birthDate: '2021-01-01'
    });
    petId = pet._id.toString();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('POST: debería registrar una adopción', async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'Pet adopted');

    const adoption = await adoptionModel.findOne({ owner: userId, pet: petId });
    assert.ok(adoption);
    adoptionId = adoption._id.toString();
  });

  it('GET: debería devolver todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.payload));
    assert.ok(res.body.payload.some(a => a.owner === userId));
  });

  it('GET: debería devolver una adopción por ID', async () => {
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.payload.owner, userId);
    assert.equal(res.body.payload.pet, petId);
  });
});


//node --test tests/adoptions.test.js
