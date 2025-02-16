import express, { Application } from 'express';
import cors from 'cors';

const middlewares: express.RequestHandler[] = [
  cors(),
  express.urlencoded({extended: true}),
  express.json()
];

export default (app: Application): void => {
  middlewares.forEach((middleware: express.RequestHandler) => {
    app.use(middleware)
  })
}