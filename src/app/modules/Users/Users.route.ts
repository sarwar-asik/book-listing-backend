/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UsersController } from './Users.controller';
import { UsersValidation } from './Users.validation';

const router = Router();
router.get('/', UsersController.getAllDB);
router.get('/:id', UsersController.getSingleDataById);
router.patch(
  '/:id',
  validateRequest(UsersValidation.updateUser),
  UsersController.updateIntoDb
);
router.delete('/:id', UsersController.deleteFromDb);

export const usersRoutes = router;
