


import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });

  return result;
};
const getAllDB = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();

  return result;
};


const getSingleData = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return result;
};



const updateItoDb = async(id:string,payload:Partial<Order>):Promise<Order>=>{

  console.log(id,payload);
  const result =await prisma.order.update({
    where:{
      id
    },
    data:payload
  })

  return result

}

const deleteFromDb = async(id:string):Promise<Order>=>{


  const result =await prisma.order.delete({
    where:{
      id
    }
  })

  return result

}


export const OrderService = { insertDB, getAllDB ,getSingleData,updateItoDb,deleteFromDb};