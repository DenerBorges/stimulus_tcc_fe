import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const projects = new this.projectsModel({
      ...createProjectDto,
      _id: new mongoose.Types.ObjectId().toHexString(),
    });
    return await projects.save();
  }

  async findAll() {
    const foundAllProject = await this.projectsModel.find();
    return foundAllProject;
  }

  async findOne(id: string) {
    const foundProject = await this.projectsModel.findById(id);
    return foundProject;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updateProject = await this.projectsModel.findByIdAndUpdate(
      id,
      {
        $set: updateProjectDto,
      },
      {
        new: true,
      },
    );
    return updateProject;
  }

  async remove(id: string) {
    const removeProject = await this.projectsModel
      .deleteOne({
        _id: id,
      })
      .exec();
    return removeProject;
  }
}
