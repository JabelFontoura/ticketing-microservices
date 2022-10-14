import { errorHandler } from '@jsftickets/common';
import { app } from './app';
import mongoose from 'mongoose';

const startUp = async () => {
  const serverPortConfiguration = Number(process.env.SERVER_PORT as string);
  const dbConnectionConfiguration = process.env.MONGO_URI as string;

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.');
  }

  try {
    await mongoose.connect(dbConnectionConfiguration);
  } catch (error) {
    console.error(error);
  }

  app.use(errorHandler);
  app.listen(serverPortConfiguration, () => {
    console.log(`Listening on port ${serverPortConfiguration}!`);
  });
};

startUp();
