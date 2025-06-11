// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/DB/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
