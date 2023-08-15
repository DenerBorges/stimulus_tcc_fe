import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    ProjectsModule,
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
