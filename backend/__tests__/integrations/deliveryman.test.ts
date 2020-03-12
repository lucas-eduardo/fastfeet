/* eslint-disable */
import request from 'supertest';
import faker from 'faker/locale/pt_BR';

import truncate from '../utils/truncate';
import insertDatas from '../utils/insertDatas';

import app from '../../src/app';

let token: string;

describe('Delivery Man', () => {
  beforeEach(async () => {
    await truncate();
    await insertDatas();
  });

  describe('Store', () => {
    it('passing the correct data to the delivery person register', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      const login = {
        email: 'admin@fastfeet.com',
        password: '123456'
      }

      const { body: { token: tokenResponse } } = await request(app).post('/sessions').send(login);
      token = tokenResponse;

      const { body } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(body).toHaveProperty('id');
    });

    it('passing the incorrect parameters, it must not allow registering', async () => {
      const json = {
        email: faker.internet.email()
      }

      const { body, status } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('passing existing e-mail, you cannot allow to register', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);
      const { body, status } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('lists all registered deliverers', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body, status} = await request(app).get('/deliverymans').set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(200);
      expect(body).not.toHaveLength(0);
    });

    it('no return delivery', async () => {
      const {body, status} = await request(app).get('/deliverymans').set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(200);
      expect(body).toHaveLength(0);
    });
  });

  describe('Show', () => {
    it('returns a specific delivery person', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      const { body: { id: idRegister } } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body: { id }, status} = await request(app).get(`/deliverymans/${idRegister}`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(200);
      expect(id).toBe(idRegister);
    });

    it('do not locate delivery person and do not return', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body, status} = await request(app).get(`/deliverymans/22`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Update', () => {
    it('update a specific delivery person', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      const { body: { id: idRegister } } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body: { id }, status} = await request(app).put(`/deliverymans/${idRegister}`).set({'Authorization': `Bearer ${token}`}).send({
        name: faker.name.findName()
      });

      expect(status).toBe(200);
      expect(id).toBe(idRegister);
    });

    it('passing incorrect data for update, do not allow update', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      const { body: { id: idRegister } } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body, status} = await request(app).put(`/deliverymans/${idRegister}`).set({'Authorization': `Bearer ${token}`}).send({
        email: faker.name.findName()
      });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('not allow to put an existing email in the database', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);
      const { body: { id: idRegister } } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send({...json, email: faker.internet.email()});

      const {body, status} = await request(app).put(`/deliverymans/${idRegister}`).set({'Authorization': `Bearer ${token}`}).send({
        email: json.email
      });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('try to update a non-existent delivery person in the database', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const {body, status} = await request(app).put(`/deliverymans/22`).set({'Authorization': `Bearer ${token}`}).send({
        name: faker.name.findName()
      });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Destroy', () => {
    it('delete a specific delivery existing in the database', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      const { body: { id: idRegister } } = await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const { status } = await request(app).delete(`/deliverymans/${idRegister}`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(200);
    });

    it('try to delete a non-existent delivery person in the database', async () => {
      const json = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }

      await request(app).post('/deliverymans').set({'Authorization': `Bearer ${token}`}).send(json);

      const { body, status } = await request(app).delete(`/deliverymans/20`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    })
  });
});
