import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number, cookie: string[]) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    });
};

const createId = () => new mongoose.Types.ObjectId().toHexString();

export { createTicket, createId };
