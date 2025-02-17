import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import db from "../../config/db.config";
import { BasicApiResponse } from "../../types/response.type";
import { userValidation } from "./user.validation";

class UserController {
  private bcrypt: any;
  private db: any;
  constructor(bcrypt: any, db: any) {
    this.bcrypt = bcrypt;
    this.db = db;
  }

  async signupPostController(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const validationResult = await userValidation.signupValidation({username, password});

      if(!validationResult.isValid) {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 400,
          message: 'Validation error occurred',
          error: {
            message: validationResult.error
          }
        }
        res.json(validationresult)
      } else {
        console.log('everything all right');
        console.log(this.db);
        
      }
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon'
      }
      res.json(response);
    }
  }
}

export const userController = new UserController(bcrypt, db);