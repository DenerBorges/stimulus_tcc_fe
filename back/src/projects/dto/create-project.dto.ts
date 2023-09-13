export class CreateProjectDto {
  id: number;
  name: string;
  description: string;
  category: string;
  goal: number;
  amount_donated?: number;
  image: string;
  userId: number;
}
