import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

import bcrypt from "bcrypt"


const insertDb = async (data: User): Promise<User> => {

    data.password = await bcrypt.hash(data.password, Number(10));

  console.log(data);

  const signUp = await prisma.user.create({
    data,
  });

  return signUp;


};

export const AUthService = { insertDb };
