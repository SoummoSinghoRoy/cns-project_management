import dotenv from 'dotenv';
dotenv.config()

import { EnvVariables } from '../types/env_variables.type';

const env_variables: EnvVariables = {
  db: process.env.DB || '',
  db_user: process.env.DB_User || '',
  db_password: process.env.DB_Password || '',
  db_host: process.env.DB_Host || 'localhost',
  db_port: process.env.DB_Port || 3306,
  secret_key: process.env.SECRET_KEY || 'Secret-Key-001' 
}

export default env_variables;