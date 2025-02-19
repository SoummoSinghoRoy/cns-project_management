import { Sequelize, DataTypes, Model } from "sequelize";
import { ProjectAttributes, Status } from "../types/model.type";

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Project = sequelize.define<Model<ProjectAttributes>>(
    "Project",
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      intro: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      ownerId: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: dataTypes.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.Pre
      },
      startDateTime: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      endDateTime: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Project;
};


