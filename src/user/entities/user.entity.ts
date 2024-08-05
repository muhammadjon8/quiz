import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  confirm_password: string;

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
