import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';

import { Category } from '../../category/entities/category.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Quiz, (quiz) => quiz.subcategory)
  quizzes: Quiz[];

  @OneToMany(() => Result, (result) => result.subcategory)
  results: Result[];
}
