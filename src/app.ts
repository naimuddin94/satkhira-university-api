import cors from 'cors';
import express from 'express';
import { semesterRouter } from './app/modules/semester/semester.route';
import { userRouter } from './app/modules/user/user.route';
import { globalErrorHandler, notFound } from './app/utils';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running 🎉');
});

// all routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/semesters', semesterRouter);

// not found route handling
app.all('*', notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
