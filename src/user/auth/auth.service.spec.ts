// src/user/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../user.repository';
import { RedisService } from 'src/DB/redis/redis.service';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

jest.mock('bcryptjs'); // برای mock کردن hash و compare

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserRepo = {
    emailExists: jest.fn(),
    verifyOtp: jest.fn(),
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
  };

  const mockRedis = {
    get: jest.fn(),
    ttl: jest.fn(),
    set: jest.fn(),
  };

  const mockMail = {
    sendOtpEmail: jest.fn(),
  };

  const mockJwt = {
    sign: jest.fn().mockReturnValue('fake-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepo },
        { provide: RedisService, useValue: mockRedis },
        { provide: MailService, useValue: mockMail },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkUserExistsOrThrow', () => {
    it('should throw if user already exists', async () => {
      mockUserRepo.emailExists.mockResolvedValue(true);

      await expect(
        authService.checkUserExistsOrThrow('mehdi@example.com'),
      ).rejects.toThrow(UserAlreadyExistsException);
    });

    it('should throw if otp already sent', async () => {
      mockUserRepo.emailExists.mockResolvedValue(false);
      mockRedis.get.mockResolvedValue('123456');
      mockRedis.ttl.mockResolvedValue(250);

      await expect(
        authService.checkUserExistsOrThrow('mehdi@example.com'),
      ).rejects.toThrow(); // می‌تونی exception دقیق هم تست کنی

      expect(mockRedis.ttl).toHaveBeenCalled();
    });

    it('should generate and send otp if all ok', async () => {
      mockUserRepo.emailExists.mockResolvedValue(false);
      mockRedis.get.mockResolvedValue(null);

      const fakeOtp = '654321';
      jest
        .spyOn(require('src/functions/user.functions'), 'generateOtp')
        .mockResolvedValue(fakeOtp);

      await authService.checkUserExistsOrThrow('mehdi@example.com');

      expect(mockRedis.set).toHaveBeenCalledWith(
        'otp:mehdi@example.com',
        fakeOtp,
        300,
      );
      expect(mockMail.sendOtpEmail).toHaveBeenCalledWith(
        'mehdi@example.com',
        fakeOtp,
      );
    });
  });

  describe('RegisterUser', () => {
    it('should throw if user exists', async () => {
      mockUserRepo.emailExists.mockResolvedValue(true);

      await expect(
        authService.RegisterUser(
          'mehdi@example.com',
          'mehdi',
          'pass123',
          '123456',
        ),
      ).rejects.toThrow(UserAlreadyExistsException);
    });

    it('should throw if otp is not valid', async () => {
      mockUserRepo.emailExists.mockResolvedValue(false);
      mockUserRepo.verifyOtp.mockResolvedValue(false);

      await expect(
        authService.RegisterUser(
          'mehdi@example.com',
          'mehdi',
          'pass123',
          '123456',
        ),
      ).rejects.toThrow();
    });

    it('should hash password and create user', async () => {
      mockUserRepo.emailExists.mockResolvedValue(false);
      mockUserRepo.verifyOtp.mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');

      await authService.RegisterUser(
        'mehdi@example.com',
        'mehdi',
        'pass123',
        '123456',
      );

      expect(mockUserRepo.createUser).toHaveBeenCalledWith({
        email: 'mehdi@example.com',
        username: 'mehdi',
        password: 'hashed-pass',
      });
    });
  });
  describe('loginUser', () => {
    it('should throw if user not found', async () => {
      mockUserRepo.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.loginUser('mehdi@example.com', 'pass123'),
      ).rejects.toThrow();
    });

    it('should throw if password is wrong', async () => {
      mockUserRepo.findUserByEmail.mockResolvedValue({
        id: 1,
        email: 'mehdi@example.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.loginUser('mehdi@example.com', 'pass123'),
      ).rejects.toThrow();
    });

    it('should return access token if credentials are correct', async () => {
      mockUserRepo.findUserByEmail.mockResolvedValue({
        id: 1,
        email: 'mehdi@example.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.loginUser(
        'mehdi@example.com',
        'pass123',
      );
      expect(result).toEqual({ accessToken: 'fake-token' });
    });
  });
});
