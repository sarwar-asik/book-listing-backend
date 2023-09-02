


import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

type IOrder = Order & {
  orderedBooks: {
    bookId: string;
    quantity: number;
  }[];
};

const insertDB = async (data: IOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: data.userId,
      orderedBooks: {
        create: data?.orderedBooks.map((book) => ({
          bookId: book.bookId,
          quantity: book.quantity,
        })),
      }
    },
    include:{
      orderedBooks:true
    }
  });

  return result;
};
const getAllDB = async (userRole:{userId:string} | null): Promise<Order[]> => {
  // console.log(userRole.userId);

  const isUserExits = await prisma.user.findUnique({
    where:{
      id:userRole?.userId
    }
  })
  // console.log(isUserExits);

  if(!isUserExits){
    throw new ApiError(httpStatus.BAD_REQUEST,"User is not exits")
  }

  const result = await prisma.order.findMany({
    where:{
      userId:userRole?.userId
    },
    include:{
      orderedBooks:true
    }
  });

  return result;
};


const getSingleData = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include:{
      orderedBooks:true
    }
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<Order>):Promise<Order>=>{

  console.log(id,payload);
  const result =await prisma.order.update({
    where:{
      id
    },
    data:payload,
    include:{
      orderedBooks:true
    }
  })

  return result

}

const deleteFromDb = async(id:string):Promise<Order>=>{


  const result =await prisma.order.delete({
    where:{
      id
    },
    include:{
      orderedBooks:true
    }
  })

  return result

}


export const OrderService = { insertDB, getAllDB ,getSingleData,updateItoDb,deleteFromDb};