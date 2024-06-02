/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

let server: Server;

(async () => {
  try {
    await mongoose.connect(config.db_uri!);
    console.log('Database connection established 🎉');
    server = app.listen(config.port, () => {
      console.log('server listening on port: ' + config.port);
    });
  } catch (error) {
    console.log(error);
  }
})();

process.on('unhandledRejection', () => {
  console.log(`😈 UnhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});