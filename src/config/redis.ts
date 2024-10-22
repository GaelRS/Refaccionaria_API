import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://host.docker.internal:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    await redisClient.connect();
};

export { redisClient, connectRedis };
