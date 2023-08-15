export class CreateProjectDto {
  _id: string;
  name: string;
  description: string;
  category: string;
  goal: number;
  amount_donated?: number;
  image: string;
  user_id: string;
}
