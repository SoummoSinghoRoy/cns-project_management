import { Request } from "express";

export interface UserRequestBody {
  username: string;
  password: string;
  designation?: string;
  department?: string;
}

export interface EmployeeAddRequestBody extends UserRequestBody {
  employee_type: string;
  work_status: string;
}

export interface CustomRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
    employeeType: string;
    workStatus: string;
  } | null
}

export interface ProjectRequestBody {
  name: string;
  intro: string;
  startDateTime: string;
  endDateTime: string;
}

export interface ProjectAddRequestBody extends ProjectRequestBody {
  ownerId: string | number;
  status: string;
  teamMembers: [];
}

export type ProjectUpdateRequestBody = Pick<ProjectAddRequestBody, 'status'>;

export interface ReportGenerateRequestField {
  from: string;
  to: string;
}