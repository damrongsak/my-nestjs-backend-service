import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'test@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
