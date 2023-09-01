import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDb = async (data: User): Promise<User> => {
  console.log(data);

  const signUp = await prisma.user.create({
    data,
  });

  return signUp;
};

export const AUthService = { insertDb };
