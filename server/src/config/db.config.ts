import { DataTypes, Model, Sequelize } from "sequelize";
import env_variables from "./custom_env_variables";
// import { ProjectAttributes, UserAttributes } from "../types/model.type";

const sequelize: Sequelize = new Sequelize(env_variables.db, env_variables.db_user, env_variables.db_password, {
  host: env_variables.db_host,
  port: env_variables.db_port,
  dialect: "mysql"
});

sequelize.authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
          })
          .catch(err => {
            console.log(`Unable to connect to the database: ${err}`);
          })

// interface DB {
//   Sequelize: typeof Sequelize;
//   sequelize: Sequelize;
//   user: typeof Model<UserAttributes, UserAttributes>;
//   project: typeof Model<ProjectAttributes, ProjectAttributes>
// }

let db: any = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../model/User.model').default(sequelize, DataTypes);
db.project = require('../model/Project.model').default(sequelize, DataTypes);

db.project.belongsTo(db.user, { foreignKey: "ownerId", as: "owner" });

db.project.belongsToMany(db.user, {
  through: "ProjectTeamMembers",
  as: "teamMembers",
  foreignKey: "projectId",
});

db.user.belongsToMany(db.project, {
  through: "ProjectTeamMembers",
  as: "projects",
  foreignKey: "userId",
});

export default db;