/* istanbul ignore file */

const TooManyRequestError = require('../Commons/exceptions/TooManyRequestError');

const defaultRate = {
    limit: 90,
    window: 60,
};

const rateLimitOptions = (redisClient) => ({
    defaultRate: () => defaultRate,
    key: (request) => request.auth.credentials?.id,
    redisClient,
    overLimitError: () =>
        new TooManyRequestError(
            'you have exceeded your request limit',
        ),
    onRedisError: (err) => console.log(err?.message),
});

module.exports = rateLimitOptions;
