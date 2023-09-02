/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ProfileController } from './Profile.controller';

const router = Router();
router.get('/',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER),ProfileController.getProfileDataById)


export const profileRoutes = router;

// export const ProfileRoutes = router;
