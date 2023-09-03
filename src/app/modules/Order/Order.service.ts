import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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
        create: data?.orderedBooks.map(book => ({
          bookId: book.bookId,
          quantity: book.quantity,
        })),
      },
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};
const getAllDB = async (
  userRole: { role: string; userId: string } | null
): Promise<Order[]> => {
  // console.log(userRole.userId);

  if (userRole?.role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });

    return result;
  }

  const isUserExits = await prisma.user.findUnique({
    where: {
      id: userRole?.userId,
    },
  });

  // console.log(isUserExits);

  if (!isUserExits) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not exits');
  }

  const result = await prisma.order.findMany({
    where: {
      userId: userRole?.userId,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getSingleData = async (
  id: string,
  userRole: { role: string; userId: string } | null
): Promise<Order | null> => {
  console.log(userRole, 'userRole');

  if (userRole?.role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: true,
      },
    });

    return result;
  }

  const result = await prisma.order.findMany({
    where: {
      userId: userRole?.userId,
      id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result[0];
};

const updateItoDb = async (
  id: string,
  payload: Partial<Order>
): Promise<Order> => {
  console.log(id, payload);
  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const deleteFromDb = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

export const OrderService = {
  insertDB,
  getAllDB,
  getSingleData,
  updateItoDb,
  deleteFromDb,
};
