import { Request, Response } from "express";
import db from "../../config/db.config";
import { projectValidation } from "./project.validation";
import { BasicApiResponse, ProjectApiResponse } from "../../types/response.type";

class ProjectController {
  private database: typeof db;
  private reqValidation: typeof projectValidation;

  constructor(database: typeof db, projectReqValidation: typeof projectValidation) {
    this.database = database;
    this.reqValidation = projectReqValidation;
  }

  projectAddPostController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, intro, ownerId, status, startDateTime, endDateTime, teamMembers } = req.body;
      const validationResult = await this.reqValidation.projectAddValidation({name, intro, ownerId, status, startDateTime, endDateTime, teamMembers});

      if(!validationResult.isValid) {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 400,
          message: 'Validation error occurred',
          error: {
            message: validationResult.error,
          },
        };
        res.json(validationresult);
      } else {
        const project = await this.database.project.create({
          name,
          intro,
          ownerId,
          status,
          startDateTime,
          endDateTime,
        });
    
        if (Array.isArray(teamMembers) && teamMembers.length > 0) {
          await project.addTeamMembers(teamMembers);
        }

        const projectdata = await this.database.project.findOne({
          where: { id: project.id },
          include: [
            { association: "owner" },
            { association: "teamMembers" },
          ],
        });

        const response: ProjectApiResponse = {
          success: true,
          statusCode: 200,
          message: `Project succesfully added`,
          data: projectdata
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
      res.json(response);
    }
  };

  projectUpdateController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, intro, status, startDateTime, endDateTime } = req.body;
      const { projectId } = req.params;
      const validProject = await this.database.project.findByPk(+projectId);

      if(validProject) {
        const validationResult = this.reqValidation.projectUpdateValidation({name, intro, status, startDateTime, endDateTime});

        if(!validationResult.isValid) {
          const validationresult: BasicApiResponse = {
            success: false,
            statusCode: 400,
            message: 'Validation error occurred',
            error: {
              message: validationResult.error,
            },
          };
          res.json(validationresult);
        } else {
          await this.database.project.update(
            {name, intro, status, startDateTime, endDateTime},
            {where: {id: validProject.id}}
          );

          const updatedProject = await this.database.project.findByPk(validProject.id);
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project updated',
            data: updatedProject
          }
          res.json(response);
        }
      } else {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Project not valid',
        };
        res.json(validationresult);
      }

    } catch (error) {
      console.log(error);
      const response: BasicApiResponse = {
        success: false,
        statusCode: 500,
        message: 'Internal server error | get back soon',
      };
      res.json(response);
    }
  }
}

export const projectController = new ProjectController(db, projectValidation);

