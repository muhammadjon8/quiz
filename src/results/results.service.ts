import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultsModelRepository: Repository<Result>,
  ) {}

  async create(createResultsDto: CreateResultDto) {
    try {
      const deliveryOrder =
        this.resultsModelRepository.create(createResultsDto);
      return this.resultsModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.resultsModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const results = await this.resultsModelRepository.findOne({
        where: { id },
      });
      if (!results) {
        throw new NotFoundException(`results with ID ${id} not found`);
      }
      return results;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateResultsDto: UpdateResultDto) {
    try {
      await this.resultsModelRepository.update({ id }, updateResultsDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const resultsModelRepository = await this.findOne(id);
    if ('error' in resultsModelRepository) {
      // DeliveryOrder not found, return the error
      return resultsModelRepository;
    }
    return this.resultsModelRepository.remove([resultsModelRepository]);
  }
}
