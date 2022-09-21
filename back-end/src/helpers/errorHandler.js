class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function HandleThrowError(message, status) {
  throw new CustomError(message, status);
}

module.exports = { HandleThrowError, CustomError };