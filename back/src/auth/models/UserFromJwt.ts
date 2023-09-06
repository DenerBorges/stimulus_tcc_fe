import { User as PrismaUser } from '@prisma/client';

export interface UserFromJwt extends PrismaUser {
  id: string;
  user: string;
}
