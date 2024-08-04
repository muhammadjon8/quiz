import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the category with the specified id.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
