import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const deliveryOrder = this.userModelRepository.create(createUserDto);
      return this.userModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.userModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userModelRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
      return user;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userModelRepository.update({ id }, updateUserDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const userModelRepository = await this.findOne(id);
    if ('error' in userModelRepository) {
      // DeliveryOrder not found, return the error
      return userModelRepository;
    }
    return this.userModelRepository.remove([userModelRepository]);
  }
}
