import { Request, Response } from "express";
import db from "../../config/db.config";
import { BasicApiResponse, UserApiResponse } from "../../types/response.type";
import { userValidation } from "./user.validation";
import { bcryptConfig } from "../../config/bcrypt.config";
import { jwt_token } from "../../config/jwt.config";
import { CustomRequest } from "../../types/request.type";

class UserController {
  private database: typeof db;
  private reqValidation: typeof userValidation;
  private configureBcrypt: typeof bcryptConfig;
  private jwtToken: typeof jwt_token

  constructor(database: typeof db, userReqValidation: typeof userValidation, passwordBcrypt: typeof bcryptConfig, jwttoken: typeof jwt_token) {
    this.database = database;
    this.reqValidation = userReqValidation;
    this.configureBcrypt = passwordBcrypt;
    this.jwtToken = jwttoken;
  }

  signupPostController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const validationResult = await this.reqValidation.signupValidation({ username, password });

      if (!validationResult.isValid) {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 400,
          message: 'Validation error occurred',
          error: {
            message: validationResult.error,
          },
        };
        res.status(400).json(validationresult);
      } else {
        const hash = await this.configureBcrypt.generatePassword(password)
        const registerUser = await this.database.user.create({
          username, password: hash, role: 'admin', employee_type: 'admin'
        });
        const response: UserApiResponse = {
          success: true,
          statusCode: 200,
          message: 'User successfully created',
          data: {
            id: registerUser.id,
            username: registerUser.username,
            role: registerUser.role,
            employeeType: registerUser.employee_type
          }
        }
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon',
      };
      res.status(500).json(response);
    }
  };

  loginPostController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const validationResult = await this.reqValidation.loginValidation({ username, password });

      if (!validationResult.isValid) {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 400,
          message: 'Validation error occurred',
          error: {
            message: validationResult.error,
          },
        };
        res.status(400).json(validationresult);
      } else {
        const validUser = await this.database.user.findOne({username});

        if(validUser) {
          const match = await this.configureBcrypt.comparePassword(password, validUser.password);          
          if(match) {
            const jwtResult = this.jwtToken.jwtSign({id: validUser.id, username: validUser.username, role: validUser.role, employeeType: validUser.employee_type});
            if(jwtResult.statusCode === 200) {
              const response: UserApiResponse = {
                success: true,
                statusCode: jwtResult.statusCode,
                message: `Successfully loggedin`,
                token: 'Bearer ' + jwtResult.token,
                isAuthenticated: true
              }
              res.json(response);
            } else {
              const response: UserApiResponse = {
                success: false,
                statusCode: jwtResult.statusCode,
                message: jwtResult.message,
                isAuthenticated: false
              }
              res.json(response);
            }
          } else {
            const validationresult: BasicApiResponse = {
              success: false,
              statusCode: 401,
              message: 'Incorrect password',
            }
            res.json(validationresult)
          }
        } else {
          const validationresult: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'User not found',
          }
          res.json(validationresult)
        }
      }
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon',
      };
      res.status(500).json(response);
    }
  };

  logoutPostController = async (req: Request, res: Response): Promise<void> => {
    const request = req as CustomRequest;
    try {
      request.user = null;
      const response: UserApiResponse = {
        success: true,
        statusCode: 200,
        message: 'Successfully loggedout',
        isAuthenticated: false
      }
      res.json(response)
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error'
      }
      res.json(response);
    }
  };

  employeeAddPostController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password, employee_type } = req.body;
      const validationResult = await this.reqValidation.employeeAddValidation({ username, password, employee_type });

      if (!validationResult.isValid) {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 400,
          message: 'Validation error occurred',
          error: {
            message: validationResult.error,
          },
        };
        res.status(400).json(validationresult);
      } else {
        const hash = await this.configureBcrypt.generatePassword(password)
        const registerUser = await this.database.user.create({
          username, password: hash, role: 'employee', employee_type
        });
        const response: UserApiResponse = {
          success: true,
          statusCode: 200,
          message: 'Employee successfully created',
          data: {
            id: registerUser.id,
            username: registerUser.username,
            role: registerUser.role,
            employeeType: registerUser.employee_type
          }
        }
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon',
      };
      res.status(500).json(response);
    }
  };

  employeeResponsiblityUpdateController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { employee_type } = req.body;
      const { employeeId } = req.params;
      const validUser = await this.database.user.findByPk(+employeeId);

      if(validUser) {
        await this.database.user.update(
          {employee_type},
          {where: { id: validUser.id }}
        );

        const updatedEmployee = await this.database.user.findByPk(validUser.id);

        if(validUser.employee_type !== updatedEmployee.employee_type) {
          const response: UserApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Employee responsibility updated',
            data: {
              employeeType: updatedEmployee.employee_type
            }
          }
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 406,
            message: 'Not accepted the update',
          };
          res.status(500).json(response);
        }
      } else {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Employee not found',
        }
        res.json(validationresult)
      }
      
    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon',
      };
      res.status(500).json(response);
    }
  };
}

export const userController = new UserController(db, userValidation, bcryptConfig, jwt_token);