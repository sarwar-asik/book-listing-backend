/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { CategoryController } from './Category.controller';
import {CategoryValidation } from './Category.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
const router = Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN),validateRequest(CategoryValidation.createCategory), CategoryController.insertDB);
router.get('/',auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllDB);
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), CategoryController.getSingleDataById);
router.patch(
  '/:id'
  ,auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategory),
  CategoryController.updateIntoDb
);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteFromDb);


export const categoryRoutes = router;
