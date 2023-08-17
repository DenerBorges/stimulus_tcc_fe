import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
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

  async login(userDto: User): Promise<UserToken> {
    const validatedUser = await this.validateUser(
      userDto.user,
      userDto.password,
    );

    if (validatedUser) {
      const payload: UserPayload = {
        sub: validatedUser._id.toString(),
        user: validatedUser.user,
      };

      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken,
        user_name: validatedUser.user,
      };
    }
    throw new UnauthorizedException('Email ou senha incorretos.');
  }

  async validateUser(user: string, password: string) {
    const users = await this.usersService.findByUser(user);

    if (users) {
      const isPasswordValid = await bcrypt.compare(password, users.password);

      if (isPasswordValid) {
        return {
          ...users.toJSON(),
          password: password,
        };
      }
    }
    throw new Error('Email ou senha enviados estão incorretos.');
  }
}
