/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UsersController } from './Users.controller';
import { UsersValidation } from './Users.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();
router.get('/',auth(ENUM_USER_ROLE.ADMIN), UsersController.getAllDB);
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), UsersController.getSingleDataById);
router.patch(
  '/:id'
  ,auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UsersValidation.updateUser),
  UsersController.updateIntoDb
);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), UsersController.deleteFromDb);

export const usersRoutes = router;
