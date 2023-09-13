export class UserData {
  id: number;
  user: string;
  birthdate: string;
  email: string;
  password: string;
  mobile?: string;
  document?: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;

  constructor(data: Partial<UserData> = {}) {
    Object.assign(this, data);
  }
}
