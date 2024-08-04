import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from '../../sub_category/entities/sub_category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}
