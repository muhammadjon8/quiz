import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub_category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub_category.dto';
import { SubCategory } from './entities/sub_category.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const { categoryId } = createSubCategoryDto;

    // Check if the categoryId exists
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    const subCategory = this.subCategoryRepository.create(createSubCategoryDto);
    return this.subCategoryRepository.save(subCategory);
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find();
  }

  async findOne(id: number): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return subCategory;
  }

  async update(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    const subCategory = await this.findOne(id);
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    Object.assign(subCategory, updateSubCategoryDto);
    return this.subCategoryRepository.save(subCategory);
  }

  async remove(id: number): Promise<SubCategory> {
    const subCategory = await this.findOne(id);
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return this.subCategoryRepository.remove(subCategory);
  }
}
