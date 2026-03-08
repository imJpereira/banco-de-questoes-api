import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { Alternative } from './alternative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Alternative])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}