// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { generateOtp } from 'src/functions/user.functions';
import { RedisService } from 'src/DB/redis/redis.service';
import { MailService } from './mail.service';
import { OtpIsNotCorrectException } from '../exceptions/otp-is-not-correct.exception';
import { OtpAlreadySentException } from '../exceptions/otp-already-sent.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}
  async checkUserExistsOrThrow(email: string): Promise<void> {
    const exists = await this.userRepository.emailExists(email);
    if (exists) {
      throw new UserAlreadyExistsException();
    }
    const key = `otp:${email}`;
    const existingOtp = await this.redisService.get(key);

    if (existingOtp) {
      const ttl = await this.redisService.ttl(key); // زمان باقی‌مانده به ثانیه
      throw new OtpAlreadySentException(ttl); // این exception رو خودت باید بسازی
    }
    const otp = await generateOtp();
    await this.redisService.set(key, otp, 300);
    await this.mailService.sendOtpEmail(email, otp);
  }

  async RegisterUser(
    email: string,
    username: string,
    password: string,
    otp: string,
  ): Promise<void> {
    const userAlreadyExists = await this.userRepository.emailExists(email);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }
    const exists = await this.userRepository.verifyOtp(email, otp);
    if (!exists) {
      throw new OtpIsNotCorrectException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({
      email,
      username,
      password: hashedPassword,
    });
  }
}
