import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator';

export class CheckEmailDto {
  @IsString({ message: 'ایمیل باید رشته باشد' })
  @IsNotEmpty({ message: 'ایمیل نمی‌تواند خالی باشد' })
  @IsEmail({}, { message: 'فرمت ایمیل معتبر نیست' })
  @MinLength(11, { message: 'ایمیل باید حداقل 11 کاراکتر باشد' })
  @MaxLength(320, { message: 'ایمیل نمی‌تواند بیشتر از 320 کاراکتر باشد' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'ایمیل باید با @gmail.com تمام شود',
  })
  email: string;
}
