import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const users = new this.usersModel({
      ...createUserDto,
      _id: new mongoose.Types.ObjectId().toHexString(),
    });
    users.password = await bcrypt.hash(createUserDto.password, 10);
    return users.save();
  }

  async findAll() {
    const foundAllUser = await this.usersModel.find();
    return foundAllUser;
  }

  async findOne(id: string) {
    const foundOneUser = await this.usersModel.findById(id);
    return foundOneUser;
  }

  async findByUser(user: string) {
    const foundUser = await this.usersModel.findOne({ user });
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
    return updateUser;
  }

  async remove(id: string) {
    const removeUser = await this.usersModel
      .deleteOne({
        _id: id,
      })
      .exec();
    return removeUser;
  }
}
