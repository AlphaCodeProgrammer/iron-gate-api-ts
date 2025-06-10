import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // یا مسیر مناسب پروژه‌ات
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // کد خطا P2002 یعنی Unique Constraint violation
        if (err.code === 'P2002') {
          throw new ConflictException(`This ${err.meta?.target} is already in use`);
        }
      }
      throw new InternalServerErrorException('Unexpected database error');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (err) {
      throw new InternalServerErrorException('Error fetching user by email');
    }
  }
}
