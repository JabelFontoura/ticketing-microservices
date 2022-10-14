import request from 'supertest';
import { app } from '../../app';
import { createId, createTicket } from './test-helper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = createId();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.fakeSignin())
    .send({
      title: 'concert',
      price: 10,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = createId();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'concert',
      price: 10,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const ticket = await createTicket('concert', 100);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', global.fakeSignin())
    .send({ title: 'title' })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {});
