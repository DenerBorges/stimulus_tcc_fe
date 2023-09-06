import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Reward } from '@prisma/client';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post(':projectId')
  async create(
    @Param('projectId') projectId: string,
    @Body() data: Omit<Reward, 'projectId'>,
  ): Promise<Reward> {
    try {
      return this.rewardsService.create(data, projectId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Projeto não encontrado');
      }
      throw error;
    }
  }

  @Get()
  findAll(): Promise<Reward[]> {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reward | null> {
    return this.rewardsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() reward: Reward,
  ): Promise<Reward | null> {
    return this.rewardsService.update(id, reward);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }
}
