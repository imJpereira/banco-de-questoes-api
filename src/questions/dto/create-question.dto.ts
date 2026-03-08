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

export class CreateAlternativeDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  is_correct: boolean;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeDto)
  alternatives: CreateAlternativeDto[];
}