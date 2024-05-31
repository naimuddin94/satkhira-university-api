import cors from 'cors';
import express from 'express';
import router from './app/routes';
import { globalErrorHandler, notFound } from './app/utils';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running 🎉');
});

app.use('/api/v1/', router);

// not found route handling
app.all('*', notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
