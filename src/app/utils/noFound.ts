import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

interface CustomError extends Error {
  status?: number;
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error(
    `can't find ${req.originalUrl} on the server`,
  );
  error.status = httpStatus.NOT_FOUND;
  next(error);
};

export default notFound;
