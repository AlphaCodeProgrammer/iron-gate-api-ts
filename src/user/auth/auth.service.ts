// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async checkUserExistsOrThrow(email: string): Promise<void> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new UserAlreadyExistsException();
    }
    
  }
}
