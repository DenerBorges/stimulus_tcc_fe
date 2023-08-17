import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(message?: string) {
    super(
      message || 'Você não está autorizado a acessar este recurso.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
