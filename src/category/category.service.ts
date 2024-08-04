import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryModelRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const deliveryOrder =
        this.categoryModelRepository.create(createCategoryDto);
      return this.categoryModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.categoryModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryModelRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`category with ID ${id} not found`);
      }
      return category;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryModelRepository.update({ id }, updateCategoryDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const categoryModelRepository = await this.findOne(id);
    if ('error' in categoryModelRepository) {
      // DeliveryOrder not found, return the error
      return categoryModelRepository;
    }
    return this.categoryModelRepository.remove([categoryModelRepository]);
  }
}
