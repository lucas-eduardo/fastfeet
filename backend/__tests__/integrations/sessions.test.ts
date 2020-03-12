/* eslint-disable */
import request from 'supertest';
import faker from 'faker/locale/pt_BR';

import app from '../../src/app';

const correctEmail = 'admin@fastfeet.com';

describe('Sessions', () => {
  it('passing the correct data, you need to return the token', async () => {
    const json = {
      email: correctEmail,
      password: '123456'
    }

    const { body } = await request(app).post('/sessions').send(json);

    expect(body).toHaveProperty('token');
  });

  it('not passing the email, you need to return an error', async () => {
    const json = {
      password: '123456'
    }

    const { status, body } = await request(app).post('/sessions').send(json);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('not passing the password, you need to return an error', async () => {
    const json = {
      email: correctEmail
    }

    const { status, body } = await request(app).post('/sessions').send(json);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('passing incorrect password, need to be returning error', async () => {
    const json = {
      email: correctEmail,
      password: '12345678'
    }

    const { status, body } = await request(app).post('/sessions').send(json);

    expect(status).toBe(401);
    expect(body).toHaveProperty('error');
  });

  it('passing incorrect e-mail, need to be returning error', async () => {
    const email = await faker.internet.email();

    const json = {
      email,
      password: '123456'
    }

    const { status, body } = await request(app).post('/sessions').send(json);

    expect(status).toBe(401);
    expect(body).toHaveProperty('error');
  });

  it('passing 5 characters of password', async () => {
    const json = {
      email: correctEmail,
      password: '12345'
    }

    const { status, body } = await request(app).post('/sessions').send(json);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
