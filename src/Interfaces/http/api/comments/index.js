const { Server } = require('@hapi/hapi');
const { Container } = require('instances-container');
const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'comments',
    /**
     *
     * @param {Server} server
     * @param {Object} options
     * @param {Container} options.container
     */
    register: async (server, { container }) => {
        const commentsHandler = new CommentsHandler(container);
        server.route(routes(commentsHandler));
    },
};
