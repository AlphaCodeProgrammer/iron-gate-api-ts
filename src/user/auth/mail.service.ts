// src/user/auth/mail.service.ts

import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private mg;

  constructor() {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY!,
      url: 'https://api.mailgun.net',
      timeout: 10000, // ← خیلی مهم
    });
    
  }

  async sendOtpToEmail(to: string, otp: string) {
    return this.mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `MyApp <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject: 'کد تایید',
      text: `کد تایید شما: ${otp}`,
    });
  }
  
}
