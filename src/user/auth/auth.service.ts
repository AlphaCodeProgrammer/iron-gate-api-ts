// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async checkUserExists(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }
}
