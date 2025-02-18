import validator from 'validator';
import { BaseError, ValidationResult } from '../../types/validation.type';
import { UserRequestBody, EmployeeAddRequestBody } from '../../types/request.type';

class UserValidation {
  private errorResult: { [field: string]: string; } = {}

  private baseValidation(reqField: UserRequestBody): BaseError {
    if(!reqField.username) {
      this.errorResult.username = `User name required`
    }

    if (!reqField.password) {
      this.errorResult.password = `Password is required`
    } else if (!validator.isLength(reqField.password, { min: 6, max: 10 })) {
      this.errorResult.password = `Password length must be 6 to 10 charecter`
    }

    return this.errorResult
  }

  async signupValidation(reqField: UserRequestBody): Promise<ValidationResult> {
    const validationresult = this.baseValidation(reqField);

    if(Object.keys(validationresult).length !== 0) {
      this.errorResult = {};
      return {
        error: validationresult,
        isValid: Object.keys(validationresult).length === 0
      }
    } else {
      return {
        error: validationresult,
        isValid: Object.keys(validationresult).length === 0
      }
    }
  };
  
  async loginValidation(reqField: UserRequestBody): Promise<ValidationResult> {
    const validationresult = this.baseValidation(reqField);

    if(Object.keys(validationresult).length !== 0) {
      this.errorResult = {};
      return {
        error: validationresult,
        isValid: Object.keys(validationresult).length === 0
      }
    } else {
      return {
        error: validationresult,
        isValid: Object.keys(validationresult).length === 0
      }
    }
  };

  async employeeAddValidation(reqField: EmployeeAddRequestBody): Promise<ValidationResult> {

    if(!reqField.username) {
      this.errorResult.username = `User name required`
    }

    if (!reqField.password) {
      this.errorResult.password = `Password is required`
    } else if (!validator.isLength(reqField.password, { min: 6, max: 10 })) {
      this.errorResult.password = `Password length must be 6 to 10 charecter`
    }

    if(!reqField.employee_type) {
      this.errorResult.employee_type = `Employee must be coordinator or assistant`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  }

}

export const userValidation = new UserValidation();