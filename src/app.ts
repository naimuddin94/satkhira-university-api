import cors from 'cors';
import express from 'express';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running 🎉');
});

export default app;
