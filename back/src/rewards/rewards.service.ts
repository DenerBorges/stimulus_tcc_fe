import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './entities/reward.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RewardsService {
  constructor(@InjectModel(Reward.name) private rewardsModel: Model<Reward>) {}

  async create(createRewardDto: CreateRewardDto) {
    const rewards = new this.rewardsModel({
      ...createRewardDto,
      _id: new mongoose.Types.ObjectId().toHexString(),
    });
    return await rewards.save();
  }

  async findAll() {
    const foundAllReward = await this.rewardsModel.find();
    return foundAllReward;
  }

  async findOne(id: string) {
    const foundReward = await this.rewardsModel.findById(id);
    return foundReward;
  }

  async update(id: string, updateRewardDto: UpdateRewardDto) {
    const updateReward = await this.rewardsModel.findByIdAndUpdate(
      id,
      {
        $set: updateRewardDto,
      },
      {
        new: true,
      },
    );
    return updateReward;
  }

  async remove(id: string) {
    const removeReward = await this.rewardsModel
      .deleteOne({
        _id: id,
      })
      .exec();
    return removeReward;
  }
}
