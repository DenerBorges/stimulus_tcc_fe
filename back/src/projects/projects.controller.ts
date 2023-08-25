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
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() data: Omit<Project, 'userId'>,
  ): Promise<Project> {
    try {
      return this.projectsService.create(data, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuário não encontrado');
      }
      throw error;
    }
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() project: Project,
  ): Promise<Project | null> {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
