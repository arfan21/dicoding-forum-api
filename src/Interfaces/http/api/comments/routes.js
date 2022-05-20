const CommentsHandler = require('./handler');

/**
 *
 * @param {CommentsHandler} handler
 * @returns
 */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/threads/{id}/comments',
        handler: handler.postCommentHandler,
        options: {
            auth: 'forumapi_jwt',
            plugins: {
                rateLimit: {
                    enabled: process.env.NODE_ENV !== 'test',
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/threads/{threadId}/comments/{commentId}/replies',
        handler: handler.postReplyHandler,
        options: {
            auth: 'forumapi_jwt',
            plugins: {
                rateLimit: {
                    enabled: process.env.NODE_ENV !== 'test',
                },
            },
        },
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteCommentHandler,
        options: {
            auth: 'forumapi_jwt',
            plugins: {
                rateLimit: {
                    enabled: process.env.NODE_ENV !== 'test',
                },
            },
        },
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
        handler: handler.deleteReplyHandler,
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
