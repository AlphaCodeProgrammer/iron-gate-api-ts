// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user.repository';
import { PrismaModule } from 'src/DB/prisma/prisma.module';
import { RedisModule } from 'src/DB/redis/redis.module';
import { MailService } from './mail.service';
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AuthController, MailService],
  providers: [AuthService, UserRepository, MailService],
  exports: [MailService, MailService],
})
export class AuthModule {}
