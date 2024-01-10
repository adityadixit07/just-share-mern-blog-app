class ErrorHandler extends Error {
  constructor(message, statusCode,status) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default ErrorHandler;
