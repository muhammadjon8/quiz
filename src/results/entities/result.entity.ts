import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { SubCategory } from '../../sub_category/entities/sub_category.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correct_answers: number;

  @Column()
  wrong_answers: number;

  @ManyToOne(() => User, (user) => user.results, { nullable: false })
  user: User;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.results, {
    nullable: false,
  })
  subcategory: SubCategory;
}
