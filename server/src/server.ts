import express, { Application, ErrorRequestHandler } from 'express';

const app: Application = express();
const localIP = '192.168.78.136';
const port: number = 8080;
import db from './config/db.config';

db.sequelize.sync().then(() => {
  console.log('Database sync.....');
  app.listen(port, localIP, () => {
    console.log(`Server is running successfully on port: ${port}`);
  })
}).catch((err: ErrorRequestHandler) => {
  console.log(`DB connection failed. error: ${err}`);
})
  
import setMiddleware from './middleware/middlewares';
setMiddleware(app);
import setRoute from './api/route';
setRoute(app);
