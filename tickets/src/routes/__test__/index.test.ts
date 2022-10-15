import request from 'supertest';
import { app } from '../../app';
import { createTicket } from './test-helper';

it('can fetch a list of tickets', async () => {
  await createTicket('concert', 100, global.fakeSignin());
  await createTicket('movie', 10, global.fakeSignin());

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(2);
});
