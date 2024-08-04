import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  option1: string;

  @Column()
  option2: string;

  @Column()
  option3: string;

  @Column()
  correct_answer: string;

  @Column()
  subcategoryId: number;
}
