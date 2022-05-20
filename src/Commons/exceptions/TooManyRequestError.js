const ClientError = require('./ClientError');

class TooManyRequestError extends ClientError {
    constructor(message) {
        super(message, 429);
        this.name = 'TooManyRequestError';
    }
}

module.exports = TooManyRequestError;
