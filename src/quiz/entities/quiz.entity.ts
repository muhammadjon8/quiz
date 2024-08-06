import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SubCategory } from '../../sub_category/entities/sub_category.entity';

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
  subcategoryId: number;

  @Column()
  correct_answer: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.quizzes, {})
  subcategory: SubCategory;
}
