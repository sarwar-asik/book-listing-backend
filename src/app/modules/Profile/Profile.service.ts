
import {  Prisma,Profile } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Profile): Promise<Profile> => {
  const result = await prisma.Profile.create({
    data,
  });

  return result;
};

export const ProfileService = {insertDB};
