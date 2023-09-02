import { Book, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

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

  data.publicationDate = isoDate1 as Date;

  // console.log(data,'fffff');
  // return data

  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

type IFilters = {
  search?: string;
  minPrice?: string;
 maxPrice?: string;
  category?: string;
  roomId?: string;
  facultyId?: string;
  title?: string;
  price?: string;
  genre?: string;
  publicationDate?:string;
  author?:string;
  [key: string]: string | number | undefined;
};

const getAllDB = async (
  filters: Partial<IFilters>,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  console.log(filters, 'ffffffff');

  console.log(options, 'oooo');

  // const {page=1,size=5,sortOrder="asc",} = options

  const page = Number(options.page || 1);
  const limit = Number(options.size || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  // console.log(page,limit,skip,'sss');

  // const { category, ...search } = filters;

  // console.log("category",category,"search",search);

  // const searchArray =[]

  // for (const key in search) {
  //   if (Object.prototype.hasOwnProperty.call(search, key)) {
  //     const condition = {
  //       [key as keyof typeof search]: {
  //         contains: search[key ] as string,
  //         mode: 'insensitive',
  //       },
  //     };
  //     searchArray.push(condition);
  //   }
  // }

  // console.log(...searchArray,'ssssssss');
  const where:Prisma.BookWhereInput = {
    ...(filters?.minPrice && { price: { gte: parseInt(filters?.minPrice, 10) } }),
    ...(filters?.maxPrice && { price: { lte: parseInt(filters?.maxPrice, 10) } }),
    ...(filters?.category && { categoryId: filters?.category }), // Filter by category ID
    ...(filters?.search && {
      OR: [
        { title: { contains: filters?.search, mode: 'insensitive' } },
        { author: { contains: filters?.search, mode: 'insensitive' } },
        { genre: { contains:filters?.search, mode: 'insensitive' } },
      ],
    }),
  };
  

  const result = await prisma.book.findMany({
    where,
    // where:
    //  {
      // ! for filter
      // categoryId: {
      //   [category ? 'equals' : 'contains']: category,
      //   mode: 'insensitive',
      // },

     //! for search

    //  [searchArray?.length>0?"OR":"title"]: searchArray
    // OR: searchArray.length > 0
    // ? [...searchArray]
    // : [
    //     {
    //       [category?"title":"categoryId"]: {
    //         contains: '',
    //         mode: 'insensitive',
    //       },
    //     },
    //   ],

    


    // ...(filters?.category && { categoryId: "eebfd026-cdf8-4558-8da4-44167250a71d" }),
    
    // OR: [
    //   {
    //     categoryId: {
    //       equals: filters?.category || "",
    //       mode: 'insensitive',
    //     },
    //   },
    //   {
    //     title: {
    //       contains: filters?.title || '', 
    //       mode: 'insensitive',
    //     },
    //   },
    //   {
    //     author: {
    //       contains: filters?.author || '',
    //       mode: 'insensitive',
    //     },
    //   },
    //   {
    //     genre: {
    //       contains: filters?.genre || '', 
    //       mode: 'insensitive',
    //     },
    //   },
    // ],
  
    // },

    include: {
      category: true,
    },
    // !for pagination
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
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
    include: {
      category: true,
    },
  });

  return result;
};

const updateItoDb = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  console.log(id, payload);
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteFromDb = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  insertDB,
  getAllDB,
  getSingleData,
  updateItoDb,
  deleteFromDb,
};
