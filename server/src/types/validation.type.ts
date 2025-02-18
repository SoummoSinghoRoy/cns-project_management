export type BaseError = string | object; 

export interface ValidationResult {
  error: BaseError;
  isValid: boolean;
}