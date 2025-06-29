import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
    });
    const { password: _, ...result } = user;
    return this.login(result);
  }

  forgotPassword(email: string) {
    // This is a simplified example. In a real-world application,
    // you would send an email with a password reset link.
    console.log(`Password reset requested for ${email}`);
    return { message: 'Password reset email sent' };
  }
}
