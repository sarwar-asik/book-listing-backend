import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AUthService } from './Auth.services';
import config from '../../../config';

const signUpDB = catchAsync(async (req: Request, res: Response) => {
  const userData = req?.body;
  const result = await AUthService.insertDb(userData);

  


  if (result) {
    const { password, ...data } = result;
  console.log(password);
  // console.log(result,"rrrrr");
  
    sendResponse<Partial<User>>(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User created successfully',
      data: data,
    });
  }
});


const signIn = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  // console.log(loginData,"asdfsd");

  const token = await AUthService.authSignIN(loginData);

  

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('JWTToken', token, cookieOption);


  res.json({
    success: true,
    statusCode: 200,
    message: "User signin successfully!",
    token
  })
  
})

export const AuthController = { signUpDB,signIn };
