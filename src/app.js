require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer');
const container = require('./Infrastructures/container');
const redisClient = require('./Infrastructures/database/redis/client');

(async () => {
    const server = await createServer(container, redisClient());
    await server.start();
    console.log(`server start at ${server.info.uri}`);
})();
