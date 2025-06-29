import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const signUpDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = 'hashedpassword';
      const user = {
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = 'testtoken';

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      jest.spyOn(userService, 'createUser').mockResolvedValue(user);
      jest.spyOn(service, 'login').mockResolvedValue({ access_token: token });

      const result = await service.signup(signUpDto);

      expect(result).toEqual({ access_token: token });
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(userService.createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: hashedPassword,
      });
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = {
        email: 'test@example.com',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = 'testtoken';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service.login(user);

      expect(result).toEqual({ access_token: token });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        sub: 1,
      });
    });
  });

  describe('validateUser', () => {
    it('should return the user if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser('test@example.com', 'password');
      const { password, ...expectedResult } = user;

      expect(result).toEqual(expectedResult);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });
  });
});
