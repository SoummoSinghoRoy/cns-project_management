import { Request } from "express";

export interface UserRequestBody {
  username: string;
  password: string;
}

export interface EmployeeAddRequestBody extends UserRequestBody {
  employee_type: string;
}

export interface CustomRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
    employeeType: string;
  } | null
}