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
        },
    },
];

module.exports = routes;
