import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from './entities/result.entity'; // Adjust the import path as needed

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been successfully created.',
    type: Result,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all results' })
  @ApiResponse({ status: 200, description: 'List of results', type: [Result] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a result by ID' })
  @ApiResponse({
    status: 200,
    description: 'The result with the specified ID',
    type: Result,
  })
  @ApiResponse({ status: 404, description: 'Result not found' })
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a result by ID' })
  @ApiResponse({
    status: 200,
    description: 'The result has been successfully updated',
    type: Result,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(+id, updateResultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a result by ID' })
  @ApiResponse({
    status: 200,
    description: 'The result has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Result not found' })
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
