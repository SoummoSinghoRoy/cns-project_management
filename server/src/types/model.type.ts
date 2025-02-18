import { CreationOptional } from "sequelize";

export enum Role {
  Admin = 'admin',
  Employee = 'employee',
}

export enum EmployeeType {
  Admin = 'admin',
  Coordinator = 'coordinator',
  Assistant = 'assistant',
}

export interface UserAttributes {
  id: CreationOptional<number>;
  username: string;
  password: string;
  role: Role;
  employee_type: EmployeeType;
}

export enum Status {
  Pre = '0',
  Start = '1',
  End = '3',
}

export interface ProjectColumnAttributes {
  id: CreationOptional<number>;
  name: string;
  intro: string;
  ownerId: number;
  status: Status;
  startDateTime: Date | string; 
  endDateTime: Date | string; 
}

export interface ProjectAttributes extends ProjectColumnAttributes {
  owner: UserAttributes;        
  teamMembers: UserAttributes[];    
}