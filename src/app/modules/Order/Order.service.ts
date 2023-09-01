
import {  Prisma,Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertDB = async (data: Order): Promise<Order> => {
  const result = await prisma.Order.create({
    data,
  });

  return result;
};

export const OrderService = {insertDB};
