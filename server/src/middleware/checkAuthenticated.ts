import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/request.type";
import { jwt_token } from "../config/jwt.config";
import { AuthenticationResponse } from "../types/response.type";
import { EmployeeType, Role } from "../types/model.type";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const customReq = req as CustomRequest;
  const token = req.headers['authorization']?.replace('Bearer ', '');;
  
  if(token) {
    const verificationresult = jwt_token.jwtVerify(token);
    
    if (verificationresult.statusCode !== 401) {
      customReq.user = {
        id: verificationresult.decoded.id,
        username: verificationresult.decoded.username,
        role: verificationresult.decoded.role,
        employeeType: verificationresult.decoded.employeeType,
        workStatus: verificationresult.decoded.employeeStatus
      }
      next()
    } else {
      const response: AuthenticationResponse = {
        success: false,
        statusCode: verificationresult.statusCode,
        message: 'UnAuthorized! Please log in again.',
        isAuthenticated: false,
      }
      res.json(response);
    }
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Forbidden',
      isAuthenticated: false
    }
    res.json(response);
  }
}

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if(!token) {
    next()
  } else if(token) {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Already loggedin',
      isAuthenticated: true
    }
    res.json(response);
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const request = req as CustomRequest;

  if(request.user?.role === Role.Admin) {
    next()
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Unauthorized access.'
    }
    res.json(response);
  }
}

export const isCoordinator = (req: Request, res: Response, next: NextFunction): void => {
  const request = req as CustomRequest;

  if(request.user?.role === Role.Employee && request.user?.employeeType === EmployeeType.Coordinator) {
    next()
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Unauthorized access.'
    }
    res.json(response);
  }
}

export const isAssistant = (req: Request, res: Response, next: NextFunction): void => {
  const request = req as CustomRequest;

  if(request.user?.role === Role.Employee && request.user?.employeeType === EmployeeType.Assistant) {
    next()
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Unauthorized access.'
    }
    res.json(response);
  }
}
