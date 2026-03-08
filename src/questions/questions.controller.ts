import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest extends ExpressRequest {
  user: {
    id: string;
    email: string;
  };
}

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Cadastrar questão com alternativas' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Request() req: AuthRequest) {
    return this.questionsService.create(createQuestionDto, req.user.id);
  }

  @ApiOperation({ summary: 'Listar todas as questões' })
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @ApiOperation({ summary: 'Buscar questão por ID' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar questão e alternativas' })
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() req: AuthRequest,
  ) {
    return this.questionsService.update(id, createQuestionDto, req.user.id);
  }

  @ApiOperation({ summary: 'Deletar questão' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.remove(id);
  }
}