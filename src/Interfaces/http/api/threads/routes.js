const ThreadsHandler = require('./handler');

/**
 *
 * @param {ThreadsHandler} handler
 * @returns
 */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'forumapi_jwt',
            plugins: {
                rateLimit: {
                    enabled: true,
                },
            },
        },
    },
    {
        method: 'GET',
        path: '/threads/{id}',
        handler: handler.findThreadByIdHandler,
        options: {
            plugins: {
                rateLimit: {
                    enabled: true,
                },
            },
        },
    },
];

module.exports = routes;
