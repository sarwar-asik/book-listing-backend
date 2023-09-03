/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './Book.controller';
import { BookValidation } from './Book.validation';
const router = Router();

router.post('/create-book',auth(ENUM_USER_ROLE.ADMIN),validateRequest(BookValidation.createBook), BookController.insertDB);

// router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.getSingleDataById);

router.get('/:categoryId',auth(ENUM_USER_ROLE.ADMIN), BookController.getSingleByCategoryDataById);

router.get('/',auth(ENUM_USER_ROLE.ADMIN), BookController.getAllDB);

router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),validateRequest(BookValidation.updateBook),BookController.updateIntoDb
);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDb);


export const bookRoutes = router;
