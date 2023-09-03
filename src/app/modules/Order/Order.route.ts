/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './Order.controller';
import { OrderValidation } from './Order.validation';
const router = Router();

router.post(
  '/create-Order',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderValidation.createOrder),
  OrderController.insertDB
);
router.get('/',  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER), OrderController.getAllDB);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),
  OrderController.getSingleDataById
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  OrderController.updateIntoDb
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.deleteFromDb);

export const orderRoutes = router;
