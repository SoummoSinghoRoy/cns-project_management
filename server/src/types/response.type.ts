import { ValidationResult } from "./validation.type";

export interface BasicApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: {
    message: string | object
  };
}