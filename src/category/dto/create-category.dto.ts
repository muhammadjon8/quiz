import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Matematika' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
