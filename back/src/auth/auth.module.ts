import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
