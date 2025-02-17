import { Request, Response, Application, Router } from 'express';
import userRouter from './user/user.route';

interface IRoute {
  path: string,
  handler: Router | ((req: Request, res: Response) => void);
}

const routes: IRoute[] = [
  {
    path: '/api/v1/user',
    handler: userRouter
  },
  {
    path: '/',
    handler: (req: Request, res: Response) => {
      res.status(200).json({
        msg: `Server running properly`
      })
    }
  }
]

export default (app: Application): void => {
  routes.forEach((route) => {
    if(route.path === '/') {
      app.get(route.path, route.handler)
    } else {
      app.use(route.path, route.handler)
    }
  })
}