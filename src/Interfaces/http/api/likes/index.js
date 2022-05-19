const { Server } = require('@hapi/hapi');
const { Container } = require('instances-container');
const LikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'likes',
    /**
     *
     * @param {Server} server
     * @param {Object} options
     * @param {Container} options.container
     */
    register: async (server, { container }) => {
        const likesHandler = new LikesHandler(container);
        server.route(routes(likesHandler));
    },
};
