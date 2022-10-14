import 'express-async-errors';
import cookieSession from 'cookie-session';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { currentUser, NotFoundError } from '@jsftickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexRouter);
app.use(updateTicketRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

export { app };
