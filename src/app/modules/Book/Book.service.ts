


import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';



const insertDB = async (data: Book): Promise<Book> => {

  function covertDateFormate(inputDate: string | Date): Date | string | null {
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
      return null;
    }
    const isoDate = dateObject.toISOString();
    return isoDate;
  }
  
  // const date1 = "1951-07-16";
  // const date2 = "2023-09-02T06:46:40.626Z";
  
  const isoDate1 = covertDateFormate(data?.publicationDate);

  data.publicationDate = isoDate1 as Date


  // console.log(data,'fffff');
  // return data

  const result = await prisma.book.create({
    data,
    include:{
      category:true
    }
  });

  return result;
};



type IFilters = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  roomId?: string;
  facultyId?: string;
};


const getAllDB = async (filters:IFilters,options:IPaginationOptions): Promise<IGenericResponse<Book[]>> => {

  console.log(filters,"ffffffff");
  
  console.log(options,"oooo");

  // const {page=1,size=5,sortOrder="asc",} = options

  const page = Number(options.page || 1);
  const limit = Number(options.size || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  // console.log(page,limit,skip,'sss');


  const result = await prisma.book.findMany({
    include:{
      category:true,
    },
    take:limit,
    skip:skip,
    orderBy:{
      [sortBy]:sortOrder
    },
    
  });   

  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


const getSingleData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include:{
      category:true
    }
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<Book>):Promise<Book>=>{

  console.log(id,payload);
  const result =await prisma.book.update({
    where:{
      id
    },
    data:payload,
    include:{
      category:true
    }
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