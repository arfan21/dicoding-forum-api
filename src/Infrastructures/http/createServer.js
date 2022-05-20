const Hapi = require('@hapi/hapi');
const hapiAuthJwt = require('@hapi/jwt');
const hapiRateLimit = require('hapi-rate-limiter');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const threads = require('../../Interfaces/http/api/threads');
const comments = require('../../Interfaces/http/api/comments');
const likes = require('../../Interfaces/http/api/likes');
const TooManyRequestError = require('../../Commons/exceptions/TooManyRequestError');
const redisClient = require('../database/redis/client');

const addResponseHeaderRateLimit = (request, response) => {
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

const createServer = async (container) => {
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // setup rate limit using hapi-rate-limiter
    // enable rate limit when not testing
    if (process.env.NODE_ENV !== 'test') {
        const defaultRate = {
            limit: 90,
            window: 60,
        };

        await server.register({
            plugin: hapiRateLimit,
            options: {
                defaultRate: () => defaultRate,
                key: (request) => request.auth.credentials?.id,
                redisClient,
                overLimitError: () =>
                    new TooManyRequestError(
                        'you have exceeded your request limit',
                    ),
                onRedisError: (err) => console.log(err),
            },
        });
    }

    await server.register([
        {
            plugin: hapiAuthJwt,
        },
    ]);

    server.auth.strategy('forumapi_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        {
            plugin: users,
            options: { container },
        },
        {
            plugin: authentications,
            options: { container },
        },
        {
            plugin: threads,
            options: { container },
        },
        {
            plugin: comments,
            options: { container },
        },
        {
            plugin: likes,
            options: { container },
        },
    ]);

    server.ext('onPreResponse', (request, h) => {
        // mendapatkan konteks response dari request
        const { response } = request;

        if (response instanceof Error) {
            // bila response tersebut error, tangani sesuai kebutuhan
            const translatedError =
                DomainErrorTranslator.translate(response);

            // penanganan client error secara internal.
            if (translatedError instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: translatedError.message,
                });
                newResponse.code(translatedError.statusCode);
                return addResponseHeaderRateLimit(
                    request,
                    newResponse,
                );
            }

            // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
            if (!translatedError.isServer) {
                return h.continue;
            }

            // penanganan server error sesuai kebutuhan
            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });
            newResponse.code(500);
            return addResponseHeaderRateLimit(request, newResponse);
        }

        // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
        return h.continue;
    });

    return server;
};

module.exports = createServer;
