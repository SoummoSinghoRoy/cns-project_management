import validator from 'validator';
import { ValidationResult } from '../../types/validation.type';
import { SignUpRequestBody } from '../../types/request.type';

class UserValidation {
  private error: { [field: string]: string; } = {}

  async signupValidation(reqField: SignUpRequestBody): Promise<ValidationResult> {

    if(!reqField.username) {
      this.error.username = `User name required`
    }

    if (!reqField.password) {
      this.error.password = `Password is required`
    } else if (!validator.isLength(reqField.password, { min: 6, max: 10 })) {
      this.error.password = `Password length must be 6 to 10 charecter`
    }

    return {
      error: this.error,
      isValid: Object.keys(this.error).length === 0

    }
  }
}

export const userValidation = new UserValidation();