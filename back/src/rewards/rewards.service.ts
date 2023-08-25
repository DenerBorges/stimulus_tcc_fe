import { Injectable, NotFoundException } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
// import { CreateRewardDto } from './dto/create-reward.dto';
// import { UpdateRewardDto } from './dto/update-reward.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Reward } from './entities/reward.entity';
// import mongoose, { Model } from 'mongoose';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Reward, 'projectId'>,
    projectId: string,
  ): Promise<Reward> {
    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return this.prisma.reward.create({
      data: {
        ...data,
        projectId: projectId,
      },
    });
  }

  async findAll(): Promise<Reward[]> {
    const foundAllReward = await this.prisma.reward.findMany();
    return foundAllReward;
  }

  async findOne(id: string) {
    const foundReward = await this.prisma.reward.findUnique({
      where: { id },
    });
    return foundReward;
  }

  async update(id: string, data: Partial<Reward>): Promise<Reward> {
    const updateReward = await this.prisma.reward.update({
      where: { id },
      data,
    });
    return updateReward;
  }

  async remove(id: string): Promise<Reward> {
    const removeReward = await this.prisma.reward.delete({
      where: { id },
    });
    return removeReward;
  }
}
