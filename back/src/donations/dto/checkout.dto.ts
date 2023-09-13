import { PaymentData } from '../types/payment-data';
import { ProjectData } from '../types/project-data';
import { RewardData } from '../types/reward-data';
import { UserData } from '../types/user-data';

export class CheckoutRequestDto {
  project: ProjectData;
  reward: RewardData;
  user: UserData;
  payment: PaymentData;
}
