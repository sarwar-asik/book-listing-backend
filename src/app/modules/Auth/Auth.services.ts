import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

import bcrypt from 'bcrypt';

const insertDb = async (data: User): Promise<Partial<User>> => {
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

export const AUthService = { insertDb };
