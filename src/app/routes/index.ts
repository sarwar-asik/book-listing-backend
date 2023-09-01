import express from 'express';
import { authRouter } from '../modules/Auth/Auth.routes';
import { usersRoutes } from '../modules/Users/Users.route';
import { categoryRoutes } from '../modules/Category/Category.route';
import { bookRoutes } from '../modules/Book/Book.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    routes: authRouter
  },
  {
    path: "/categories",
    routes: categoryRoutes
  },
  {
    path: "/categories",
    routes: usersRoutes
  },
  {
    path: "/books",
    routes: bookRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));


export default router;
