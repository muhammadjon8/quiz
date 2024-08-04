import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ example: '1-2 sinflar testi' })
  name: string;

  @ApiProperty({ example: '1' })
  categoryId: number;
}
