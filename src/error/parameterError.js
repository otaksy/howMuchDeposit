class ParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParameterError";
    this.message = message;
    this.status = 400;
  }
}

module.exports = ParameterError;