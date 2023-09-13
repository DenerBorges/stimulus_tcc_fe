import { Injectable } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaClient) {}

  async create(createProjectDto: CreateProjectDto) {
    const { userId, ...projectData } = createProjectDto;

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`Usuário com ID ${userId} não encontrado.`);
    }

    return this.prisma.project.create({
      data: {
        userId: userId,
        ...projectData,
      },
    });
  }

  async findAll(): Promise<Project[]> {
    const foundAllProject = await this.prisma.project.findMany();
    return foundAllProject;
  }

  async findOne(id: number): Promise<Project> {
    const foundProject = await this.prisma.project.findUnique({
      where: { id },
    });
    return foundProject;
  }

  async update(id: number, data: Partial<Project>): Promise<Project> {
    const updateProject = await this.prisma.project.update({
      where: { id },
      data,
    });
    return updateProject;
  }

  async remove(id: number): Promise<Project> {
    const removeProject = await this.prisma.project.delete({
      where: { id },
    });
    return removeProject;
  }
}
