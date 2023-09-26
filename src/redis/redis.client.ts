import * as os from 'os';
import * as redis from 'redis';
import { MyLogger } from 'src/services/logger/my-logger';
import config from './config';
// import { MyLogger } from 'src/services/logging/logger.service';

export class RedisClient {
  private redisClientList = [];
  public static instance = null;
  constructor(private myLogger:MyLogger) {
    config.forEach((options) => {
      this.redisClientList.push(this.createRedisClientObject(options));
    });
  }

  public static getInstance() {
    if (!this.instance) this.instance = new RedisClient(new MyLogger);
    return this.instance;
  }


  createRedisClientObject = (options) => {
    options.retry_strategy = function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        this.myLogger.error('main redis client error:', 'REDIS');
        // notifier.notifyAdmins('Urgent! Redis server is down. #' + options.error.code);
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 30) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return 3000;
    };

    const client = redis.createClient(options);

    client.on('connect', () => {
      // console.info('main redis client is connected');
      this.myLogger.log('main redis client is connected', 'REDIS');
    });

    client.on('ready', () => {
      this.myLogger.log('main redis client is ready', 'REDIS');
    });

    client.on('reconnecting', () => {
      this.myLogger.warn('main redis client is reconnecting', 'REDIS');
    });

    client.on('end', (err) => {
      this.myLogger.log('main redis client ended!', 'REDIS');
    });

    client.on('error', (err) => {
      this.myLogger.error('main redis client error: ' + err, 'REDIS');
      throw new Error(err.message);
    });

    return client;
  };

  broadcast(methodName, ...args) {
    this.redisClientList.forEach((redisClient) => {
      redisClient[methodName](...args);
    });
  }

  receive(methodName, ...args) {
    const _redisClient = this.redisClientList.find((redisClient) => {
      return this.isLocalHost(redisClient.options.host);
    }
    );
    return _redisClient[methodName](...args);
  }

  isLocalHost(address) {
    const ifaces = os.networkInterfaces();
    return true;
    let flag = false;
    Object.keys(ifaces).forEach(function (ifname) {
      ifaces[ifname].forEach(function (iface) {
        if (iface.address === address) flag = true;
      });
    });
    return flag;
  }
}
