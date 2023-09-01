import express from 'express';
import { authRouter } from '../modules/Auth/Auth.routes';
import { usersRoutes } from '../modules/Users/Users.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    routes: authRouter
  },
  {
    path: "/users",
    routes: usersRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));


export default router;
