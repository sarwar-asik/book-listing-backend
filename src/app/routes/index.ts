import express from 'express';
import { authRouter } from '../modules/Auth/Auth.routes';
import { usersRoutes } from '../modules/Users/Users.route';
import { categoryRoutes } from '../modules/Category/Category.route';
import { bookRoutes } from '../modules/Book/Book.route';
import { orderRoutes } from '../modules/Order/Order.route';

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
  {
    path: "/categories",
    routes: categoryRoutes
  },
  {
    path: "/books",
    routes: bookRoutes
  },
  {
    path: "/orders",
    routes:orderRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));


export default router;
