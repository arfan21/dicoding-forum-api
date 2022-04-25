const { Server } = require('@hapi/hapi');
const { Container } = require('instances-container');
const ThreadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'threads',
    /**
     *
     * @param {Server} server
     * @param {Object} options
     * @param {Container} options.container
     */
    register: async (server, { container }) => {
        const threadsHandler = new ThreadsHandler(container);
        server.route(routes(threadsHandler));
    },
};
