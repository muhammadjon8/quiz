import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubCategoryService } from './sub_category.service';
import { CreateSubCategoryDto } from './dto/create-sub_category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub_category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('sub-category')
@ApiTags('Sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create sub-category' })
  @ApiResponse({
    status: 201,
    description: 'The sub-category has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateSubCategoryDto })
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sub-categories' })
  @ApiResponse({ status: 200, description: 'Return all sub-categories.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sub-category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the sub-category with the specified id.',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found.' })
  @ApiParam({ name: 'id', description: 'Sub-category ID' })
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(+id);
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Get sub-category by categoryID' })
  @ApiResponse({
    status: 200,
    description: 'Return the sub-category with the specified Category id.',
  })
  @ApiResponse({ status: 404, description: 'Sub-category with this ID not found.' })
  @ApiParam({ name: 'id', description: 'Sub-category with Category ID' })
  findByCategory(@Param('id') id: string) {
    return this.subCategoryService.findByCategoryId(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sub-category by id' })
  @ApiResponse({
    status: 200,
    description: 'The sub-category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found.' })
  @ApiParam({ name: 'id', description: 'Sub-category ID' })
  @ApiBody({ type: UpdateSubCategoryDto })
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(+id, updateSubCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sub-category by id' })
  @ApiResponse({
    status: 200,
    description: 'The sub-category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found.' })
  @ApiParam({ name: 'id', description: 'Sub-category ID' })
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(+id);
  }
}
