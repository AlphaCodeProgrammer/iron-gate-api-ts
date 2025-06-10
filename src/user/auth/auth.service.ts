// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestVerificationDto } from './dto/email-verification.dto';
import { MailerService } from '@nestjs-modules/mailer'; // فرض بر اینکه استفاده می‌کنی

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async requestVerificationCode(dto: RequestVerificationDto) {
    const { email } = dto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('قبلاً با این ایمیل ثبت‌نام کرده‌اید.');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // کد ۶ رقمی

    // TODO: ذخیره‌سازی این کد در یک جدول verification_codes یا cache
    // فعلاً لاگ بگیریم

    console.log(`کد تایید برای ${email}: ${code}`);

    // ارسال ایمیل (اینجا فرض می‌گیریم mailerService تنظیم شده)
    await this.mailerService.sendMail({
      to: email,
      subject: 'کد تایید ثبت‌نام',
      text: `کد تایید شما: ${code}`,
    });

    return { message: 'کد تایید به ایمیل شما ارسال شد.' };
  }
}
