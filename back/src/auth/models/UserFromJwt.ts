import { User as PrismaUser } from '@prisma/client';

export interface UserFromJwt extends PrismaUser {
  id: number;
  user: string;
}
