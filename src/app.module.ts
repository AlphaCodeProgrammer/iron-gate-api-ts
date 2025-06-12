import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './DB/prisma/prisma.module';
import { RedisModule } from './DB/redis/redis.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, RedisModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
