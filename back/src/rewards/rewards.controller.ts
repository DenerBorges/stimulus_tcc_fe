import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Reward } from '@prisma/client';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  findAll(): Promise<Reward[]> {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reward | null> {
    return this.rewardsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() reward: Reward,
  ): Promise<Reward | null> {
    return this.rewardsService.update(+id, reward);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rewardsService.remove(+id);
  }
}
