/* eslint-disable @typescript-eslint/no-explicit-any */

class ApiError extends Error {
  public success: boolean;
  public data: null;

  constructor(
    public status: number,
    message: string = 'Something went wrong',
    public errors: any[] = [],
    stack: string = '',
  ) {
    super(message);
    this.status = status;
    this.success = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
