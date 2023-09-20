import  jwt, { Secret }  from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';

const authSignIN = async (payload: {
  userId: string;
  email?: string;
  password: string;
}): Promise<any> => {
  const { email, password } = payload;

  console.log(payload, 'payload');

  // const isUserExist = await User.isUserExistsMethod(phoneNumber);
  // // console.log(isUserExist,"isUserExits");

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not match');
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password);

  // console.log(isPasswordMatch,"ispaaaaaaaaaa");

  if (isUserExist.password && !isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is not correct');
  }

  // // console.log(isUserExist,"isUserExist");

  // const { role, _id, phoneNumber: existphoneNumber } = isUserExist;

  //   jwt part ///
  const token =  jwt.sign(payload, config.jwt.secret as Secret, { expiresIn: config.jwt.expires_in });

  return token
  // // eslint-disable-next-line no-console
  // console.log(
  //   'accessToken',
  //   accessToken,
  //   'refreshToken',
  //   refreshToken,
  //   'refreshToken'
  // );

  // return {
  //   accessToken,
  //   refreshToken,
  // };
  // return payload
};

const insertDb = async (data: User): Promise<Partial<User>> => {
  console.log('🚀 ~ file: Auth.services.ts:68 ~ insertDb ~ data:', data);

  data.password = await bcrypt.hash(data.password, Number(10));

  // console.log(data);

  const signUp = await prisma.user.create({
    data,
  });

  return {
    id: signUp.id,
    name: signUp.name,
    email: signUp?.email,
    role: signUp.role,
    contactNo: signUp?.contactNo,
    address: signUp?.address,
    profileImg: signUp?.profileImg,
  };
};

export const AUthService = { insertDb, authSignIN };
