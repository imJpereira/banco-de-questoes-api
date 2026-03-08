import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Alternative } from './alternative.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,

    @InjectRepository(Alternative)
    private readonly alternativesRepository: Repository<Alternative>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string): Promise<Question> {
    const { alternatives, ...questionData } = createQuestionDto;

    const correctAlternatives = alternatives.filter((a) => a.is_correct);
    if (correctAlternatives.length !== 1) {
      throw new BadRequestException('A questão deve ter exatamente uma alternativa correta');
    }

    const question = this.questionsRepository.create({
      ...questionData,
      user: { id: userId },
    });

    const savedQuestion = await this.questionsRepository.save(question);

    const alternativeEntities = alternatives.map((alt) =>
      this.alternativesRepository.create({
        ...alt,
        question: { id: savedQuestion.id },
      }),
    );

    await this.alternativesRepository.save(alternativeEntities);

    return this.findOne(savedQuestion.id);
  }

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find({
      relations: ['alternatives', 'user'],
    });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ['alternatives', 'user'],
    });

    if (!question) {
      throw new NotFoundException('Questão não encontrada');
    }

    return question;
  }

  async update(id: string, createQuestionDto: CreateQuestionDto, userId: string): Promise<Question> {
    await this.findOne(id);

    const { alternatives, ...questionData } = createQuestionDto;

    const correctAlternatives = alternatives.filter((a) => a.is_correct);
    if (correctAlternatives.length !== 1) {
      throw new BadRequestException('A questão deve ter exatamente uma alternativa correta');
    }

    await this.questionsRepository.update(id, {
      ...questionData,
      user: { id: userId },
    });

    await this.alternativesRepository
      .createQueryBuilder()
      .delete()
      .where('question_id = :id', { id })
      .execute();

    const alternativeEntities = alternatives.map((alt) =>
      this.alternativesRepository.create({
        ...alt,
        question: { id },
      }),
    );

    await this.alternativesRepository.save(alternativeEntities);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionsRepository.remove(question);
  }
}