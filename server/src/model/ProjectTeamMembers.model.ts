import { Sequelize, DataTypes, Model } from "sequelize";
import { ProjectTeamMembersAttributes } from "../types/model.type";

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const ProjectTeamMembers = sequelize.define<Model<ProjectTeamMembersAttributes>>(
    "ProjectTeamMembers",
    {
      projectId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Project",
          key: "id",
        },
      },
      employeeId: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return ProjectTeamMembers;
};
