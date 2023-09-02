
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

import { Order } from "@prisma/client";
import { OrderService } from "./Order.service";

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await OrderService.insertDB(data)

  sendResponse<Order>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Order',
    data: result,
  });
});


const getAllDB = catchAsync(async (req: Request, res: Response) => {

  const userRole:any  = req?.user
  console.log(userRole);
 
  const result = await OrderService.getAllDB(userRole)

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});



const getSingleDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.getSingleData(id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get Order ${id}`,
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
const data = req?.body;

  const result = await OrderService.updateItoDb(id,data);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully updated ${id}`,
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;


  const result = await OrderService.deleteFromDb(id)

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully deleted ${id}`,
    data: result,
  });
});

export const OrderController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb};
