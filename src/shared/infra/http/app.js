import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { router } from './routes/index.js';
import { AppError } from './errors/AppError.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(400).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
