import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    description: 'The question of the quiz',
    example: 'What is the capital of France?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'Option 1 for the quiz question',
    example: 'Paris',
  })
  @IsString()
  @IsNotEmpty()
  option1: string;

  @ApiProperty({
    description: 'Option 2 for the quiz question',
    example: 'London',
  })
  @IsString()
  @IsNotEmpty()
  option2: string;

  @ApiProperty({
    description: 'Option 3 for the quiz question',
    example: 'Berlin',
  })
  @IsString()
  @IsNotEmpty()
  option3: string;

  @ApiProperty({
    description: 'The correct answer for the quiz question',
    example: 'Paris',
  })
  @IsString()
  @IsNotEmpty()
  correct_answer: string;

  @ApiProperty({
    description: 'The ID of the subcategory to which this quiz belongs',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;
}
