import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/DB/prisma/prisma.service'; // یا مسیر مناسب پروژه‌ات


@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      return !!user;
    } catch (err) {
      console.error('🔥 Prisma error:', err);
      throw new InternalServerErrorException('Server Error checking user existence by email');
    }
  }
  
}
