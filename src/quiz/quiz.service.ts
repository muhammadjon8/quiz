import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { SubCategory } from '../sub_category/entities/sub_category.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { subcategoryId } = createQuizDto;

    // Check if the subcategoryId exists
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subcategoryId },
    });

    if (!subCategory) {
      throw new NotFoundException(
        `SubCategory with ID ${subcategoryId} not found`,
      );
    }

    try {
      const quiz = this.quizRepository.create({
        ...createQuizDto,
        subcategory: subCategory,
      });
      return await this.quizRepository.save(quiz);
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to create quiz: ${e.message}`,
      );
    }
  }

  async findAll(): Promise<Quiz[]> {
    try {
      return await this.quizRepository.find({ relations: ['subcategory'] });
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to retrieve quizzes: ${e.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Quiz> {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { id },
        relations: ['subcategory'], // Load related subcategory
      });
      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${id} not found`);
      }
      return quiz;
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to retrieve quiz: ${e.message}`,
      );
    }
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    await this.findOne(id); // Ensure the quiz exists
    try {
      await this.quizRepository.update(id, updateQuizDto);
      return this.findOne(id); // Return the updated quiz
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to update quiz: ${e.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    const quiz = await this.findOne(id);
    try {
      await this.quizRepository.remove(quiz);
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed to delete quiz: ${e.message}`,
      );
    }
  }
}
