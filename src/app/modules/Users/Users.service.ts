import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};
const getAllDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();

  return result;
};


const getSingleData = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<User>):Promise<User>=>{

  console.log(id,payload);
  const result =await prisma.user.update({
    where:{
      id
    },
    data:payload
  })

  return result

}

const deleteFromDb = async(id:string):Promise<User>=>{


  const result =await prisma.user.delete({
    where:{
      id
    }
  })

  return result

}


export const UsersService = { insertDB, getAllDB ,getSingleData,updateItoDb,deleteFromDb};
