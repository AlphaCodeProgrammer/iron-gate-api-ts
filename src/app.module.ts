import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './DB/prisma/prisma.module';
import { RedisModule } from './DB/redis/redis.module';
import { UserModule } from './user/user.module';
import { MailService } from './user/auth/mail.service';

@Module({
  imports: [PrismaModule, RedisModule, UserModule],
  controllers: [AppController],
  providers: [AppService, MailService],
  exports: [MailService],
})
export class AppModule {}
