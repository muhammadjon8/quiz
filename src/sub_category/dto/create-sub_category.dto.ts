import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: '1-2 sinflar testi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
