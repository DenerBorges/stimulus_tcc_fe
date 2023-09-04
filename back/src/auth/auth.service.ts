import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // login(user: User): UserToken {
  //   const payload: UserPayload = {
  //     sub: user._id.toString(),
  //     user: user.user,
  //   };

  //   const jwtToken = this.jwtService.sign(payload);
  //   const username = this.User.user;

  //   return {
  //     access_token: jwtToken,
  //   };
  // }

  async login(userDto: { user: string; password: string }): Promise<UserToken> {
    const validatedUser = await this.validateUser(
      userDto.user,
      userDto.password,
    );

    if (validatedUser) {
      const payload: UserPayload = {
        sub: validatedUser.id,
        user: validatedUser.user,
      };

      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken,
        user_name: validatedUser.user,
      };
    } else {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }
  }

  async validateUser(user: string, password: string) {
    const users = await this.prisma.user.findFirst({
      where: { user },
    });

    if (users) {
      const isPasswordValid = await bcrypt.compare(password, users.password);

      if (isPasswordValid) {
        return {
          ...users,
          password: password,
        };
      }
    }
    throw new UnauthorizedException(
      'Email ou senha enviados estão incorretos.',
    );
  }
}
