/* istanbul ignore file */

// ketika di pre response mengembalikan new response
// header yang ditambahkan dari hapi-rate-limiter hilang
const addHeaderRateLimit = (request, response) => {
    const rate = request.plugins['hapi-rate-limiter']
        ? request.plugins['hapi-rate-limiter'].rate
        : null;
    if (rate) {
        response.header('X-Rate-Limit-Remaining', rate.remaining);
        response.header('X-Rate-Limit-Limit', rate.limit);
        response.header('X-Rate-Limit-Reset', rate.reset);
        return response;
    }
    return response;
};

module.exports = addHeaderRateLimit;
