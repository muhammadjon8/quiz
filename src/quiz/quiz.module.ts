import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { SubCategory } from '../sub_category/entities/sub_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, SubCategory])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
