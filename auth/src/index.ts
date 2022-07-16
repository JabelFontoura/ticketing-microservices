import 'express-async-errors';
import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const startUp = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }

    const serverPortConfiguration = config.get('server.port');
    const dbConnectionConfiguration = config.get('db.connectionString') as string;

    const app = express();
    
    app.set('trust proxy', true);
    app.use(json());
    app.use(
        cookieSession({
            signed: false,
            secure: true
        })
    );

    app.use(currentUserRouter);
    app.use(signupRouter);
    app.use(signinRouter);
    app.use(signoutRouter);

    app.all('*', async (req, res, next) => { throw new NotFoundError() });

    app.use(errorHandler);

    try {
        await mongoose.connect(dbConnectionConfiguration);
    } catch (error) {
        console.error(error);
    }

    app.listen(serverPortConfiguration, () => {
        console.log(`Listening on port ${serverPortConfiguration}!`);
    });
}


startUp();