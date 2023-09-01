


import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';



const insertDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });

  return result;
};
const getAllDB = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany();

  return result;
};


const getSingleData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<Book>):Promise<Book>=>{

  console.log(id,payload);
  const result =await prisma.book.update({
    where:{
      id
    },
    data:payload
  })

  return result

}

const deleteFromDb = async(id:string):Promise<Book>=>{


  const result =await prisma.book.delete({
    where:{
      id
    }
  })

  return result

}


export const BookService = { insertDB, getAllDB ,getSingleData,updateItoDb,deleteFromDb};