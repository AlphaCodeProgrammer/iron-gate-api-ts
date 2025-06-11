import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClientType
  ) {}

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, { EX: ttlSeconds });
      } else {
        await this.client.set(key, value);
      }
    } catch (err) {
      this.logger.error(`Failed to set key ${key}`, err);
      throw err;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      this.logger.error(`Failed to get key ${key}`, err);
      throw err;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      this.logger.error(`Failed to delete key ${key}`, err);
      throw err;
    }
  }
}
