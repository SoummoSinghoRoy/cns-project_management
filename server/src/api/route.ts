import { Request, Response, Application, Router } from 'express';

interface IRoute {
  path: string,
  handler: Router | ((req: Request, res: Response) => void);
}

const routes: IRoute[] = [
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