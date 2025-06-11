import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DB/prisma/prisma.service';
import { RedisClientType } from 'redis';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private redisClient: RedisClientType,
  ) {}

  async createUser(data: { email: string; name?: string }) {
    return this.prisma.user.create({ data });
  }

  async setOtp(userId: string, otp: string) {
    await this.redisClient.set(`otp:user:${userId}`, otp, { EX: 300 }); // expire 5 دقیقه
  }

  async getOtp(userId: string) {
    return this.redisClient.get(`otp:user:${userId}`);
  }
}
