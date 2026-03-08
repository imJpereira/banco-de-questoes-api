import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Alternative } from './alternative.entity';
  
  @Entity('questions')
  export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column()
    subject: string;
  
    @ManyToOne(() => User, (user) => user.questions, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @OneToMany(() => Alternative, (alternative) => alternative.question, { cascade: true })
    alternatives: Alternative[];
  }