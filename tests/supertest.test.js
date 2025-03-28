import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Test básico con supertest', () => {
  it('GET / debería responder con 200', async () => {
    const res = await request(app).get('/');
    assert.equal(res.status, 200);
  });
});
