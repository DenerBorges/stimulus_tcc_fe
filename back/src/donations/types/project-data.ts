import { Decimal } from '@prisma/client/runtime/library';

export class ProjectData {
  id: number;
  name: string;
  description: string;
  category: string;
  goal: Decimal;
  image: string;
}
