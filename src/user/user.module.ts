// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/DB/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth/auth.service';
import { RedisModule } from 'src/DB/redis/redis.module';
@Module({
  imports: [PrismaModule, RedisModule],
  providers: [UserRepository, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class UserModule {}
