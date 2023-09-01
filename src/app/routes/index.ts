import express from 'express';
import { authRouter } from '../modules/Auth/Auth.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    routes: authRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
