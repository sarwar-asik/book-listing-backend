

import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';



const insertDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};
const getAllDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};


const getSingleData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include:{
      books:true
    }
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<Category>):Promise<Category>=>{

  console.log(id,payload);
  const result =await prisma.category.update({
    where:{
      id
    },
    data:payload
  })

  return result

}

const deleteFromDb = async(id:string):Promise<Category>=>{


  const result =await prisma.category.delete({
    where:{
      id
    }
  })

  return result

}


export const CategoryService = { insertDB, getAllDB ,getSingleData,updateItoDb,deleteFromDb};