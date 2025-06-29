import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully logged in.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signin(
    @Request() req: { user: Omit<import('@prisma/client').User, 'password'> },
  ) {
    return this.authService.login(req.user);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send a password reset email' })
  @ApiResponse({ status: 200, description: 'The password reset email has been sent.'})
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }
}
