import request from 'supertest';
import { app } from '../../app';
import { createId } from './test-helper';

it('returns a 404 of the ticket is not found', async () => {
  const id = createId();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 10;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.fakeSignin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
