/* eslint-disable */
import request from 'supertest';
import faker from 'faker/locale/pt_BR';

import truncate from '../utils/truncate';
import insertDatas from '../utils/insertDatas';
import app from '../../src/app';

let token: string;

describe('Recipients', () => {
  beforeEach(async () => {
    await truncate();
    await insertDatas();
  });

  describe('Store', () => {
    it('pass the correct data and register a new recipient', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const login = {
        email: 'admin@fastfeet.com',
        password: '123456'
      }

      const response = await request(app).post('/sessions').send(login);
      token = response.body.token;

      const { body } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(body).toHaveProperty('id');
    });

    it('pass name already existing in the database, do not allow to register', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const { body, status } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('not passing mandatory parameter, do not allow to register', async () => {
      const json = {
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body, status } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('list of recipients without filter', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const { body } = await request(app).get('/recipients').set({'Authorization': `Bearer ${token}`}).send();

      expect(body).not.toHaveLength(0);
    });

    it('listing without recipients', async () => {
      const { body } = await request(app).get('/recipients').set({'Authorization': `Bearer ${token}`}).send();

      expect(body).toHaveLength(0);
    });
  });

  describe('Show', () => {
    it('returns specific recipient', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body: { id } } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const { body } = await request(app).get(`/recipients/${id}`).set({'Authorization': `Bearer ${token}`}).send();

      expect(body.id).toBe(id);
    });

    it("can't find a specific recipient", async () => {
      const { body } = await request(app).get(`/recipients/20`).set({'Authorization': `Bearer ${token}`}).send();

      expect(body).toBeNull();
    });
  });

  describe('Update', () => {
    it('passes the correct parameters to update the specific recipient', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body: { id } } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const updateJson = {
        number: 50
      }

      const { body } = await request(app).put(`/recipients/${id}`).set({'Authorization': `Bearer ${token}`}).send(updateJson);

      expect(body.id).toBe(id);
    });

    it('passes the wrong parameters to update a specific recipient, prevent the update', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body: { id } } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const updateJson = {
        number: ''
      }

      const { body, status } = await request(app).put(`/recipients/${id}`).set({'Authorization': `Bearer ${token}`}).send(updateJson);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('do not allow updating specific recipient, with a name that already exists in the database', async () => {
      const firstNameRegistered = `${faker.name.firstName()} ${faker.name.lastName()}`;

      const json = {
        name: firstNameRegistered,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const jsonSecond = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body: { id } } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(jsonSecond);

      const updateJson = {
        name: firstNameRegistered
      }

      const { body, status } = await request(app).put(`/recipients/${id}`).set({'Authorization': `Bearer ${token}`}).send(updateJson);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Destroy', () => {
    it('delete a specific recipient from the database', async () => {
      const json = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        street: faker.address.streetName(),
        number: 285,
        complement: '',
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zip_code: 18079168
      }

      const { body: { id } } = await request(app).post('/recipients').set({'Authorization': `Bearer ${token}`}).send(json);

      const { status } = await request(app).delete(`/recipients/${id}`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(200);
    });

    it('delete a specific recipient that does not exist in the database', async () => {
      const { body, status } = await request(app).delete(`/recipients/20`).set({'Authorization': `Bearer ${token}`}).send();

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });
});
