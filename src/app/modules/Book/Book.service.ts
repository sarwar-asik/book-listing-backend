import { Book } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Book): Promise<Book> => {


  // ! for received "1951-07-16"  and "2023-09-02T06:46:40.626Z"   type date time

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
  title?: string;
  price?: string;
  genre?: string;
  publicationDate?: string;
  author?: string;
  // [key: string]: string | number | undefined;
};

// ! here included pagination , filtering ,searching by my own

const getAllDB = async (
  filters: Partial<IFilters>,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {

  console.log(filters, 'ffffffff');

  console.log(options, 'oooo');

  // const {page=1,size=5,sortOrder="asc",} = options
// ! for pagination ///
  const page = Number(options.page || 1);
  const limit = Number(options.size || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'asc';

  const where: { OR?: any ;AND?:any} = {};


  // ! for filter data from Book Table

  if (
    filters?.title ||
    filters?.author ||
    filters?.genre ||
    filters?.category || 
    filters?.search
  ) {
    where.OR = [];
    if (filters?.title ) {
      where.OR.push({
        title: {
          contains: filters.title ,
          mode: 'insensitive',
        },
      });
    }
    if (filters?.author) {
      where.OR.push({
        author: {
          contains: filters.author ,
          mode: 'insensitive',
        },
      });
    }

    if (filters?.genre) {
      where.OR.push({
        genre: {
          contains: filters.genre,
          mode: 'insensitive',
        },
      });
    }
    if (filters?.category) {
      where.OR.push({
        AND: [
          {
            categoryId: {
              equals: filters.category,
              mode: 'insensitive',
            },
          },
        ],
      });
    }
    if(filters?.search){
     where.OR.push(
      {
      title: {
        contains: filters.search,
        mode: 'insensitive',
      },
     }
     ,
      {
      author: {
        contains: filters.search,
        mode: 'insensitive',
      },
     },
      {
      genre: {
        contains: filters.search,
        mode: 'insensitive',
      },
     }
     )
    }
  }

  // ! for filtering with minPrice and maxPrice ////


  if (filters.minPrice || filters.maxPrice) {
    if (filters.minPrice && filters.maxPrice) {
  
      where.AND = [
        {
          price: {
            gte: parseFloat(filters.minPrice),
            lte: parseFloat(filters.maxPrice),
          },
        },
      ];
    } else if (filters.minPrice) {
   
      where.AND = [
        {
          price: {
            gte: parseFloat(filters.minPrice),
          },
        },
      ];
    } else if (filters.maxPrice) {

      where.AND = [
        {
          price: {
            lte: parseFloat(filters.maxPrice),
          },
        },
      ];
    }
  }

  const result = await prisma.book.findMany({
    where,
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
  
  // const resultDataNUmber =  result?.length

  return {
    meta: {
      total,
      page,
      size: limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<Book | null> => {
  // console.log(id,"id from sing");
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


// ! this function for get single categoryId or id in Book table

const getSingleByCategoryData = async (
  id: string,
  options: IPaginationOptions
): Promise<any>=> {
  const resultById = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (resultById) {
    return resultById;
  }

  const page = Number(options.page || 1);
  const limit = Number(options.size || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  // console.log(id,"id from sing");
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
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
      size: limit,
    },
    data: result,
  };
};

const updateItoDb = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  // console.log(id, payload);
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
  getSingleByCategoryData,
};
