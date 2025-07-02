//src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './DB/prisma/prisma.module';
import { RedisModule } from './DB/redis/redis.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), 
   PrismaModule, RedisModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
