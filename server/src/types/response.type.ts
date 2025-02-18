export interface BasicApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: {
    message: string | object
  };
}

export interface UserApiResponse extends Partial<BasicApiResponse>{
  data?: {
    id?: any;
    username?: string;
    role?: string;
    employeeType: string;
  };
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