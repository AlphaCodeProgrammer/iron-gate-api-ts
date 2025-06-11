// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { generateOtp } from 'src/functions/user.functions';
import { MailService } from './mail.service';
import { RedisService } from 'src/DB/redis/redis.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}
  async checkUserExistsOrThrow(email: string): Promise<{ success: boolean }> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new UserAlreadyExistsException();
    }
    const otp = await generateOtp();
    const key = `otp:${email}`;
    await this.redisService.set(key, otp, 300);
    await this.mailService.sendOtpToEmail(email, otp);
    return { success: true };
  }
}
