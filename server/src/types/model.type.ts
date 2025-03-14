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

export enum WorkStatus {
  Admin = 'admin',
  Engaged = 'engaged',
  Available = 'available'
}

export interface UserAttributes {
  id: CreationOptional<number>;
  username: string;
  password: string;
  role: Role;
  designation: string;
  department: string;
  employee_type: EmployeeType;
  work_status: WorkStatus;
}

export enum Status {
  Pre = '0',
  Start = '1',
  End = '3',
}

export interface ProjectAttributes {
  id: CreationOptional<number>;
  name: string;
  intro: string;
  ownerId: number;
  status: Status;
  startDateTime: Date | string; 
  endDateTime: Date | string; 
}

export interface ProjectTeamMembersAttributes {
  projectId: number;
  employeeId: number;
}