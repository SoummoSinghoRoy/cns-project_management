import { Sequelize, DataTypes, Model } from "sequelize";
import { UserAttributes, Role } from "../types/model.type";

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const User = sequelize.define<Model<UserAttributes>>('User', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    role: {
      type: dataTypes.ENUM(...Object.values(Role)),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });

  return User;
}
