import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

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

  async findOne(id: number): Promise<User> {
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

  async update(id: number, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
