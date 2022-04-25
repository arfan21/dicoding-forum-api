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
        },
    },
    {
        method: 'GET',
        path: '/threads/{id}',
        handler: handler.findThreadByIdHandler,
    },
];

module.exports = routes;
