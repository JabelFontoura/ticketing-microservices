import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import request from 'supertest';
import mongoose from 'mongoose';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'jwt_test_key';

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {});

});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }

    await mongoose.connection.close();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}