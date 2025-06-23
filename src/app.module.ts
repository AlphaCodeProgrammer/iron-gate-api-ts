//src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './DB/prisma/prisma.module';
import { RedisModule } from './DB/redis/redis.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), 
   PrismaModule, RedisModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
