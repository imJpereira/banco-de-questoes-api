import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin@admin.dev' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'teste' })
  @IsNotEmpty()
  @IsString()
  password: string;
}