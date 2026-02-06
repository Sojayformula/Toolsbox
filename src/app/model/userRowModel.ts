export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
  KEEPER = 'KEEPER',
}



export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
