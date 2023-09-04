import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './entities/user.entity';
// import mongoose, { Model } from 'mongoose';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const users = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return users;
  }

  async findAll(): Promise<User[]> {
    const foundAllUser = await this.prisma.user.findMany();
    return foundAllUser;
  }

  async findOne(id: string): Promise<User> {
    const foundOneUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return foundOneUser;
  }

  async findByUser(user: string): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: { user },
    });
    return foundUser;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async remove(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const userProjects = await this.prisma.project.findMany({
      where: { userId },
    });

    for (const project of userProjects) {
      await this.prisma.project.delete({ where: { id: project.id } });
    }

    await this.prisma.user.delete({ where: { id: userId } });
  }
}
