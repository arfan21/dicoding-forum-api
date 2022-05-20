const ClientError = require('../ClientError');
const TooManyRequestError = require('../TooManyRequestError');

describe('TooManyRequestError', () => {
    it('should create error correctly', () => {
        const tooManyRequestError = new TooManyRequestError(
            'too many request!',
        );

        expect(tooManyRequestError).toBeInstanceOf(
            TooManyRequestError,
        );
        expect(tooManyRequestError).toBeInstanceOf(ClientError);
        expect(tooManyRequestError).toBeInstanceOf(Error);

        expect(tooManyRequestError.message).toEqual(
            'too many request!',
        );
        expect(tooManyRequestError.statusCode).toEqual(429);
        expect(tooManyRequestError.name).toEqual(
            'TooManyRequestError',
        );
    });
});
