import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Question } from './question.entity';
  
  @Entity('alternatives')
  export class Alternative {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    description: string;
  
    @Column({ default: false })
    is_correct: boolean;
  
    @ManyToOne(() => Question, (question) => question.alternatives, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'question_id' })
    question: Question;
  }