/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

(async () => {
  try {
    await mongoose.connect(config.db_uri!);
    console.log('Database connection established 🎉');
    app.listen(config.port, () => {
      console.log('server listening on port: ' + config.port);
    });
  } catch (error) {
    console.log(error);
  }
})();
