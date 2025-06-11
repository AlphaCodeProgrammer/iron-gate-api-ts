import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/DB/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // فقط ماژول رو اینجا وارد کن
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
