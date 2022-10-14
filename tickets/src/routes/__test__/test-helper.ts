import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.fakeSignin())
    .send({
      title,
      price,
    });
};

const createId = () => new mongoose.Types.ObjectId().toHexString();

export { createTicket, createId };
