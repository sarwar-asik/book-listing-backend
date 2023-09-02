import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AUthService } from './Auth.services';

const signUpDB = catchAsync(async (req: Request, res: Response) => {
  const userData = req?.body;
  const result = await AUthService.insertDb(userData);

  const { password, ...data } = result;
  console.log(password);
  // console.log(result,"rrrrr");

  if (result) {
    sendResponse<Partial<User>>(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User created successfully',
      data: data,
    });
  }
});

export const AuthController = { signUpDB };
