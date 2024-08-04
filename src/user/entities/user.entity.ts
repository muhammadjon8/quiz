import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
