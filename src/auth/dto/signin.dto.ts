import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'test@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsNotEmpty()
  password: string;
}
