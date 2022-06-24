import express from 'express';
import 'express-async-errors';
import config from 'config';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from '../errors/not-found-error';

const app = express();
const serverPort = config.get('server.port');

app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res, next) => { throw new NotFoundError() });

app.use(errorHandler);

app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}!`);
});
