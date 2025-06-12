// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { generateOtp } from 'src/functions/user.functions';
import { RedisService } from 'src/DB/redis/redis.service';
import { MailService } from './mail.service';
import { SuccessRegister } from '../interceptors/success-register.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}
  async checkUserExistsOrThrow(email: string): Promise<void> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new UserAlreadyExistsException();
    }
    const otp = await generateOtp();
    const key = `otp:${email}`;
    await this.redisService.set(key, otp, 300);
    await this.mailService.sendOtpEmail(email, otp);
  }
  
}
