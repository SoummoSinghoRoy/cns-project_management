import { Request } from "express";

export interface UserRequestBody {
  username: string;
  password: string;
}

export interface EmployeeAddRequestBody extends UserRequestBody {
  employee_type: string;
  employee_status: string;
}

export interface CustomRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
    employeeType: string;
    employeeStatus: string;
  } | null
}

export interface ProjectRequestBody {
  name: string;
  intro: string;
  status: string;
  startDateTime: string;
  endDateTime: string;
}

export interface ProjectAddRequestBody extends ProjectRequestBody {
  ownerId: string | number;
  teamMembers: [];
}