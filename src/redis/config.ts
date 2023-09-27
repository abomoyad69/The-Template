const redisConfig = [
  {
    host: process.env.redis || "127.0.0.1",
    port: 6379,
    db: 0,
  },
];

export default redisConfig;
