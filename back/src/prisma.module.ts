import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Importe o serviço Prisma
import { PrismaClient } from '@prisma/client'; // Importe o PrismaClient

@Module({
  providers: [
    PrismaService,
    {
      provide: PrismaClient,
      useFactory: (prismaService: PrismaService) => prismaService.client,
      inject: [PrismaService],
    },
  ],
  exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
