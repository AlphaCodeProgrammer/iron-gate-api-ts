import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/DB/prisma/prisma.service'; // یا مسیر مناسب پروژه‌ات
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}


  async existsByEmail(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true }, // فقط id بگیر، سریع‌تر و امن‌تره
      });
      return !!user;
    } catch (err) {
      throw new InternalServerErrorException('Error checking user existence by email');
    }
  }

}
