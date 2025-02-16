interface EnvVariables {
    db: string;
    db_user: string;
    db_password: number | string;
    db_host: string;
    db_port: string | number;
    db_dialect: string;
    secret_key: string;
  }
  
  export { EnvVariables };