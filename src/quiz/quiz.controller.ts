import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({
    status: 201,
    description: 'The quiz has been successfully created.',
    type: Quiz,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all quizzes' })
  @ApiResponse({ status: 200, description: 'List of quizzes.', type: [Quiz] })
  findAll(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a quiz by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the quiz' })
  @ApiResponse({
    status: 200,
    description: 'The quiz with the specified ID.',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz by its ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the quiz to be updated',
  })
  @ApiResponse({ status: 200, description: 'The updated quiz.', type: Quiz })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz by its ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the quiz to be deleted',
  })
  @ApiResponse({
    status: 204,
    description: 'The quiz has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.quizService.remove(+id);
  }
}
