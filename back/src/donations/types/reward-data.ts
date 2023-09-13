import { Decimal } from '@prisma/client/runtime/library';

export class RewardData {
  id: number;
  name: string;
  description: string;
  value: Decimal;
}
