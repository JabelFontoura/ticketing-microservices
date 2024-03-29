
import 'express-async-errors';
import cookieSession from 'cookie-session';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from '@jsftickets/common';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.all('*', async (req: Request, res: Response, next: NextFunction) => { throw new NotFoundError() });

export { app };

