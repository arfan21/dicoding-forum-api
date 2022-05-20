const LikesHandler = require('./handler');

/**
 *
 * @param {LikesHandler} handler
 * @returns
 */
const routes = (handler) => [
    {
        method: 'PUT',
        path: '/threads/{threadId}/comments/{commentId}/likes',
        handler: handler.updateLikeHandler,
        options: {
            auth: 'forumapi_jwt',
            plugins: {
                rateLimit: {
                    enabled: process.env.NODE_ENV !== 'test',
                },
            },
        },
    },
];

module.exports = routes;
