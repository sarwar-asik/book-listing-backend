

import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfileData = async (userRole:{role:string,userId:string}): Promise<User | null> => {
  console.log(userRole);

  const result = await prisma.user.findUnique({
    where: {
      id:userRole?.userId,
    },
  });

  return result;
};

export const ProfileService = {getProfileData};
