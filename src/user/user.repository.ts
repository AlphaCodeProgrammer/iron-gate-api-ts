import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/DB/prisma/prisma.service'; // یا مسیر مناسب پروژه‌ات
import { RedisService } from 'src/DB/redis/redis.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return !!user;
  }
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const key = `otp:${email}`;
    const storedOtp = await this.redisService.get(key);
    return storedOtp === otp;
  }
  async createUser(data: {
    email: string;
    username: string;
    password: string;
  }) {
    return this.prisma.user.create({ data });
  }
}
