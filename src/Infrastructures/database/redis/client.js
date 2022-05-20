/* istanbul ignore file */
const Bluebird = require('bluebird');
const Redis = require('redis');

const redisClient = () => {
    Bluebird.promisifyAll(Redis.RedisClient.prototype);
    Bluebird.promisifyAll(Redis.Multi.prototype);

    const redis = Redis.createClient({
        url: process.env.REDIS_URL,
    });

    return redis;
};

module.exports = redisClient;
