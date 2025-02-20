import { Request, Response } from "express";
import db from "../../config/db.config";
import { projectValidation } from "./project.validation";
import { BasicApiResponse, ProjectApiResponse } from "../../types/response.type";
import { WorkStatus, Status } from "../../types/model.type";
import { Op } from "sequelize";

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
        await project.addTeamMembers(teamMembers);
        teamMembers.forEach(async (memberId: any) => {
          await this.database.user.update(
            {work_status: WorkStatus.Engaged},
            {where: {id: +memberId}}
          )
        })
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
        const validationResult = this.reqValidation.projectUpdateValidation({name, intro, startDateTime, endDateTime});

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
            {
              name: name || validProject.name, 
              intro: intro || validProject.intro,  
              startDateTime: startDateTime || validProject.startDateTime, 
              endDateTime: endDateTime || validProject.endDateTime
            },
            {where: {id: validProject.id}}
          );

          const updatedProject = await this.database.project.findByPk(validProject.id);
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project successfully updated',
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
  };

  projectStatusUpdateController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      const { projectId } = req.params;
      const validProject = await this.database.project.findByPk(+projectId, {
        include: [
          {
            association: "teamMembers",
          }
        ]
      });

      if(validProject) {
        if(status === Status.End) {
          await this.database.project.update(
            {status: Status.End},
            {where: {id: validProject.id}}
          )
          validProject.teamMembers.forEach(async (member: any) => {
            await this.database.user.update(
              {work_status: WorkStatus.Available},
              {where: {id: +member.id}}
            )
          })
          const updatedWork = await this.database.project.findByPk(validProject.id)
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project status successfully updated',
            data: {
              status: updatedWork.status
            }
          }
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 406,
            message: 'Not accepted the update',
          };
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
  };

  projectDeleteController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectId } = req.params;
      const validProject = await this.database.project.findByPk(+projectId, {
        include: [
          {
            association: "teamMembers",
          }
        ]
      });

      if(validProject) {
        await this.database.projectTeamMember.destroy(
          {where: {projectId: +projectId}}
        )
        await validProject.destroy(
          {where: {id: validProject.id}}
        )
        validProject.teamMembers.forEach(async (member: any) => {
          console.log(member.id);
          console.log(typeof member.id);
          
          await this.database.user.update(
            { work_status: WorkStatus.Available },
            { where: { id: member.id } }
          );
        })

        const deletedProject = await this.database.project.findByPk(validProject.id)

        if(!deletedProject) {
          const validationresult: BasicApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project successfully deleted'
          };
          res.json(validationresult);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 406,
            message: 'Error occurred | get back soon',
          };
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
  };

  projectRetrieveController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { from, to } = req.query;
      
      if(from && to) {
        const allProject = await this.database.project.findAll({
          where: {
            startDateTime: {
              [Op.between]: [from, to]
            }
          },
          include: ["owner", "teamMembers"] 
        })

        if(allProject.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: allProject
          };
        res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found in your desired date range',
          };
        res.json(response);
        }
      } else {
        const allProject = await this.database.project.findAll({
          include: ["owner", "teamMembers"],
          order: [["createdAt", "DESC"]] 
        })

        if(allProject.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: allProject
          };
        res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found',
          };
        res.json(response);
        }
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

  recentProjectRetrieveController = async (req: Request, res: Response): Promise<void> => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const projects = await this.database.project.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
        include: ["owner", "teamMembers"]
      });
      
      if(projects.length !== 0) {
        const response: ProjectApiResponse = {
          success: true,
          statusCode: 200,
          message: 'Project retrieve successfully',
          data: projects
        };
        res.json(response);
      } else {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Project not found',
        };
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

  assistantProjectRetrieveController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { assistantId } = req.params;
      const validAssistant = await this.database.user.findByPk(+assistantId);

      if(validAssistant) {
        const projects = await this.database.project.findAll({
          include: [
            {
                model: this.database.user,
                as: "owner",
                attributes: ["id", "username", "role", "employee_type"]
            },
            {
                model: this.database.user,
                as: "teamMembers",
                where: { id: validAssistant.id }
            },
          ],
        })
        
        if(projects.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: projects
          };
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found',
          };
          res.json(response);
        }
      } else {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Assistant employee not valid',
        };
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

  coordinatorProjectRetrieveController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { coordinatorId } = req.params;
      const validCoordinator = await this.database.user.findByPk(+coordinatorId);

      if(validCoordinator) {
        const projects = await this.database.project.findAll({
          where: {ownerId: validCoordinator.id},
          include: [
            {
              model: this.database.user,
              as: "teamMembers",
              attributes: ["id", "username", "role", "employee_type", "work_status"]
            },
          ]
        })
        
        if(projects.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: projects
          };
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found',
          };
          res.json(response);
        }
      } else {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Coordinator employee not valid',
        };
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

  recentProjectOfCoordinatorController = async (req:Request, res: Response): Promise<void> => {
    try {
      const { coordinatorId } = req.params;
      const validCoordinator = await this.database.user.findByPk(+coordinatorId);

      if(validCoordinator) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const projects = await this.database.project.findAll({
          where: {
            createdAt: {
              [Op.between]: [startOfMonth, endOfMonth],
            },
            ownerId: validCoordinator.id
          },
          include: ["teamMembers"]
        });

        if(projects.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: projects
          };
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found',
          };
          res.json(response);
        }
      } else {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Coordinator employee not valid',
        };
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

  recentProjectOfAssistantController = async (req:Request, res: Response): Promise<void> => {
    try {
      const { assistantId } = req.params;
      const validAssistant = await this.database.user.findByPk(+assistantId);

      if(validAssistant) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const projects = await this.database.projectTeamMember.findAll({
          where: {
            employeeId: validAssistant.id, 
          },
          include: [
            {
              model: this.database.project,
              as: "project",
              where: {
                createdAt: {
                  [Op.between]: [startOfMonth, endOfMonth],
                },
              },
              include: [
                {
                  model: this.database.user,
                  as: "owner",
                  attributes: ["id", "username", "role", "employee_type"]
                },
              ],
            },
          ],
        });

        if(projects.length !== 0) {
          const response: ProjectApiResponse = {
            success: true,
            statusCode: 200,
            message: 'Project retrieve successfully',
            data: projects
          };
          res.json(response);
        } else {
          const response: BasicApiResponse = {
            success: false,
            statusCode: 404,
            message: 'Project not found',
          };
          res.json(response);
        }
      } else {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Assistant employee not valid',
        };
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

  generateProjectReport = async (req: Request, res: Response): Promise<void> => {
    try {
      
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

// pdf generate
// 1. write a query based on month & year.
// 2. then generate pdf.


// Need to create all user retrieve functionality this api accessible for admin & coordinator both.


