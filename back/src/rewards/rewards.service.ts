import { Injectable } from '@nestjs/common';
import { PrismaClient, Reward } from '@prisma/client';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaClient) {}

  async create(createRewardDto: CreateRewardDto) {
    const { projectId, ...rewardData } = createRewardDto;

    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectExists) {
      throw new Error(`Projeto com ID ${projectId} não encontrado.`);
    }

    return this.prisma.reward.create({
      data: {
        projectId: projectId,
        ...rewardData,
      },
    });
  }

  async findAll(): Promise<Reward[]> {
    const foundAllReward = await this.prisma.reward.findMany();
    return foundAllReward;
  }

  async findOne(id: number) {
    const foundReward = await this.prisma.reward.findUnique({
      where: { id },
    });
    return foundReward;
  }

  async update(id: number, data: Partial<Reward>): Promise<Reward> {
    const updateReward = await this.prisma.reward.update({
      where: { id },
      data,
    });
    return updateReward;
  }

  async remove(id: number): Promise<Reward> {
    const removedReward = await this.prisma.reward.delete({
      where: { id },
    });
    return removedReward;
  }
}
