import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
// import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Project } from './entities/project.entity';
// import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Omit<Project, 'userId'>,
    userId: string,
  ): Promise<Project> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.project.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  async findAll(): Promise<Project[]> {
    const foundAllProject = await this.prisma.project.findMany();
    return foundAllProject;
  }

  async findOne(id: string): Promise<Project> {
    const foundProject = await this.prisma.project.findUnique({
      where: { id },
    });
    return foundProject;
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const updateProject = await this.prisma.project.update({
      where: { id },
      data,
    });
    return updateProject;
  }

  async remove(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const projectRewards = await this.prisma.reward.findMany({
      where: { projectId },
    });

    for (const reward of projectRewards) {
      await this.prisma.reward.delete({ where: { id: reward.id } });
    }

    await this.prisma.project.delete({ where: { id: projectId } });
  }
}
