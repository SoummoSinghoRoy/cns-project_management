export interface BasicApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: {
    message: string | object
  };
}

interface UserData {
  id?: any;
  username?: string;
  role?: string;
  employeeType?: string;
  employeeStatus?: string;
}

export interface UserApiResponse extends Partial<BasicApiResponse>{
  data?: UserData | UserData[];
  token?: string;
  isAuthenticated?: boolean;
} 

export interface JwtResponse {
  statusCode: number;
  message: string;
  token?: string;
  decoded?: any;
}

export interface AuthenticationResponse extends Partial<UserApiResponse> {}

interface ProjectData {
  id?: any
  name: string;
  intro: string;
  owner: UserData;
  status: string;
  startDateTime: string;
  endDateTime: string;
  teamMembers: UserData[];
}

export interface ProjectApiResponse extends Partial<BasicApiResponse> {
  data: ProjectData | ProjectData[];
}