import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@admin.dev' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'teste' })
  @IsNotEmpty()
  @IsString()
  password: string;
}