export class ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;

  constructor(statusCode: number, message: string, data?: T, error?: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(200, message, data);
  }

  static failure<T>(message: string, error?: string): ApiResponse<T> {
    return new ApiResponse(400, message, undefined, error);
  }
}
