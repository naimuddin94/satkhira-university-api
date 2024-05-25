/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
};

export default globalErrorHandler;
