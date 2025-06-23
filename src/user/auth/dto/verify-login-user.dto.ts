// src/user/auth/dto/verify-login-user.dto.ts
import { IsString, IsEmail, MinLength, IsNotEmpty , Matches } from 'class-validator';

export class VerifyLoginUserDto {
  @IsEmail({}, { message: 'فرمت ایمیل معتبر نیست' })
  @IsNotEmpty({ message: 'ایمیل نمی‌تواند خالی باشد' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'ایمیل باید با @gmail.com تمام شود',
  })
  email: string;

  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @IsNotEmpty({ message: 'رمز عبور نمی‌تواند خالی باشد' })
  @MinLength(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' })
  password: string;
}
