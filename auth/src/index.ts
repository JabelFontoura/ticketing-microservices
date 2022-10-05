import { errorHandler } from '@jsftickets/common';
import { app } from './app';
import config from 'config';
import mongoose from 'mongoose';

const startUp = async () => {
    const serverPortConfiguration = config.get('server.port');
    const dbConnectionConfiguration = config.get('db.connectionString') as string;
    
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
}

startUp();