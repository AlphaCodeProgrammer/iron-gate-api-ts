// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { generateOtp } from 'src/functions/user.functions';
import { MailService } from './mail.service';
// import { RedisService } from 'src/DB/redis/redis.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    // private readonly redisClient: RedisService,
  ) {}
  async checkUserExistsOrThrow(email: string): Promise<void> {
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new UserAlreadyExistsException();
    }
    const otp = generateOtp();
    // await this.redisClient.set(`otp:${email}`, otp, 'EX', 300); // expires in 5 minutes
    await this.mailService.sendOtpToEmail(email, otp);
  }
}
