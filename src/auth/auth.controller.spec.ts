import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        PrismaService,
        ConfigService,
        {
          provide: LocalAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with the correct parameters', async () => {
      const signUpDto = { email: 'test@example.com', password: 'password' };
      const spy = jest
        .spyOn(service, 'signup')
        .mockResolvedValue({ access_token: 'testtoken' });
      await controller.signup(signUpDto);
      expect(spy).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signin', () => {
    it('should call authService.login with the correct parameters', async () => {
      const req = {
        user: {
          email: 'test@example.com',
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      const spy = jest
        .spyOn(service, 'login')
        .mockResolvedValue({ access_token: 'testtoken' });
      await controller.signin(req);
      expect(spy).toHaveBeenCalledWith(req.user);
    });
  });

  describe('forgotPassword', () => {
    it('should call authService.forgotPassword with the correct parameters', async () => {
      const forgotPasswordDto = { email: 'test@example.com' };
      const spy = jest
        .spyOn(service, 'forgotPassword')
        .mockReturnValue({ message: 'Password reset email sent' });
      await controller.forgotPassword(forgotPasswordDto);
      expect(spy).toHaveBeenCalledWith('test@example.com');
    });
  });
});
