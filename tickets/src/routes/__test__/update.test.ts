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

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await createTicket('concert', 100, global.fakeSignin());

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.fakeSignin())
    .send({
      title: 'new title',
      price: 10
    }).expect(401);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.fakeSignin();
  const response = await createTicket('concert', 100, cookie);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'title' })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ price: 10 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 1 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: 'price' })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => { 
  const cookie = global.fakeSignin();
  const response = await createTicket('concert', 100, cookie);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 50 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(50);
});
