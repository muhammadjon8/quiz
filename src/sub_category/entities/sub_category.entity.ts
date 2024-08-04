import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
