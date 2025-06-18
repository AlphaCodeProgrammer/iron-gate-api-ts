// src/user/auth/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: 'کد ورود یک‌بار مصرف شما',
    text: `کد شما: ${otp}`,
    html: `
      <div style="font-family: Tahoma, sans-serif; background-color: #f7f7f7; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center;">👋 سلام!</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">
            کد ورود یک‌بار مصرف (OTP) شما برای ورود به حساب کاربری:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; background-color: #f0f0f0; padding: 15px 30px; border-radius: 6px; letter-spacing: 3px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #999; text-align: center;">
            این کد تا ۵ دقیقه دیگر منقضی می‌شود. اگر شما این درخواست را انجام نداده‌اید، لطفاً این پیام را نادیده بگیرید.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    this.logger.log(`✅ OTP sent to ${to}`);
  } catch (error) {
    this.logger.error(`❌ Failed to send OTP: ${error.message}`);
    throw error;
  }
}

}
