import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request, SetMetadata } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IS_PUBLIC_KEY } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @SetMetadata(IS_PUBLIC_KEY, true)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
