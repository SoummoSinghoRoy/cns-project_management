import db from "../../config/db.config";
import { ProjectAddRequestBody, ProjectRequestBody, ProjectUpdateRequestBody, ReportGenerateRequestField } from "../../types/request.type";
import { ValidationResult } from "../../types/validation.type";

class ProjectValidation {
  private errorResult: { [field: string]: string; } = {}
  private database: typeof db;

  constructor(database: typeof db) {
    this.database = database;
  }

  async projectAddValidation(reqField: ProjectAddRequestBody): Promise<ValidationResult> {
    const existProject = await this.database.project.findOne({where: {name: reqField.name}})

    if(!reqField.name) {
      this.errorResult.name = `Project name required`
    } else if(reqField.name && existProject) {
      this.errorResult.name = `Project already exist`
    }

    if(!reqField.intro) {
      this.errorResult.intro = `Intro is required`
    }

    if(!reqField.startDateTime) {
      this.errorResult.startDateTime = `Start date is required`
    }

    if(!reqField.endDateTime) {
      this.errorResult.endDateTime = `End date is required`
    }

    if(!reqField.ownerId) {
      this.errorResult.owner = `Owner is required`
    }

    if(!reqField.status) {
      this.errorResult.status = `Status is required`
    }

    if(!Array.isArray(reqField.teamMembers)) {
      this.errorResult.teamMembers = `Team members is required`
    } else if(Array.isArray(reqField.teamMembers) && reqField.teamMembers.length === 0) {
      this.errorResult.teamMembers = `Atleast select one member`
    } else if(Array.isArray(reqField.teamMembers) && reqField.teamMembers.length > 5) {
      this.errorResult.teamMembers = `Max 5 members applicable`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  };

  projectUpdateValidation(reqField: ProjectRequestBody): ValidationResult {

    if(!reqField.name) {
      this.errorResult.name = `Project name required`
    }

    if(!reqField.intro) {
      this.errorResult.intro = `Intro is required`
    }

    if(!reqField.startDateTime) {
      this.errorResult.startDateTime = `Start date is required`
    }

    if(!reqField.endDateTime) {
      this.errorResult.endDateTime = `End date is required`
    }

    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  };

  projectStatusUpdateValidation(reqField: ProjectUpdateRequestBody): ValidationResult {
    if(!reqField.status) {
      this.errorResult.status = `Status is required`
    }
    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  };

  reportGenerateValidation(reqField: ReportGenerateRequestField): ValidationResult {
    if(!reqField.from) {
      this.errorResult.from = `From date is required`
    }

    if(!reqField.to) {
      this.errorResult.to = `To date is required`
    }
    
    return {
      error: this.errorResult,
      isValid: Object.keys(this.errorResult).length === 0
    }
  }
}

export const projectValidation = new ProjectValidation(db);