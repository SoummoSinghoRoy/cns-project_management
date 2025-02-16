import express, { Application } from 'express';

const app: Application = express();
const port: number = 8080;

app.listen(port, (): void => {
  console.log(`Server listening on PORT: ${port}`);
})
  
import setMiddleware from './middleware/middlewares';
setMiddleware(app);
import setRoute from './api/route';
setRoute(app);
