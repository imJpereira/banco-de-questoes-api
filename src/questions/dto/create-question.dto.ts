import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlternativeDto {
  @ApiProperty({ example: 'Brasília' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_correct: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'Qual é a capital do Brasil?' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Geografia' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    type: [CreateAlternativeDto],
    example: [
      { description: 'São Paulo', is_correct: false },
      { description: 'Brasília', is_correct: true },
      { description: 'Rio de Janeiro', is_correct: false },
      { description: 'Salvador', is_correct: false },
      { description: 'Manaus', is_correct: false },
    ],
  })
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeDto)
  alternatives: CreateAlternativeDto[];
}