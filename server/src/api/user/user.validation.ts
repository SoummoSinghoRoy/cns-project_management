import validator from 'validator';
import { ValidationResult } from '../../types/validation.type';
import { UserRequestBody, EmployeeAddRequestBody } from '../../types/request.type';
import db from '../../config/db.config';
class UserValidation {
  private errorResult: { [field: string]: string; } = {}
  private validationresult: any;

  async signupValidation(reqField: UserRequestBody): Promise<ValidationResult> {
    if(!reqField.username) {
      this.errorResult.username = `User name required`
    }

    if (!reqField.password) {
      this.errorResult.password = `Password is required`
    } else if (!validator.isLength(reqField.password, { min: 6, max: 10 })) {
      this.errorResult.password = `Password length must be 6 to 10 charecter`
    }
    
    if(!reqField.designation) {
      this.validationresult.designation = `Designation is required`
    }

    if(!reqField.department) {
      this.errorResult.department = `Department is required`
    }

    const existUser = await db.user.findOne({where: {username: reqField.username}});

    if(existUser) {
      this.errorResult.username = `Must use unique user name`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  };
  
  async loginValidation(reqField: UserRequestBody): Promise<ValidationResult> {
    if(!reqField.username) {
      this.errorResult.username = `User name required`
    }

    if (!reqField.password) {
      this.errorResult.password = `Password is required`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
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

    if(!reqField.designation) {
      this.errorResult.designation = `Designation is required`
    }

    if(!reqField.department) {
      this.errorResult.department = `Department is required`
    }

    if(!reqField.employee_type) {
      this.errorResult.employee_type = `Employee must be coordinator or assistant`
    }

    if(!reqField.work_status) {
      this.errorResult.work_status = `Work status must be available or engaged`
    }

    const existEmployee = await db.user.findOne({where: {username: reqField.username}});

    if(existEmployee) {
      this.errorResult.username = `Must use unique user name`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  }

}

export const userValidation = new UserValidation();