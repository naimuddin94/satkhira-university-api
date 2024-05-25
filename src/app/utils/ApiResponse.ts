class ApiResponse<T> {
  public success: boolean;
  constructor(
    public status: number,
    public data: T,
    public message: string,
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

export default ApiResponse;
