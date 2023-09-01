
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UsersService } from "./Users.service";
import { User } from "@prisma/client";

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UsersService.insertDB(data)

  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Users',
    data: result,
  });
});


const getAllDB = catchAsync(async (req: Request, res: Response) => {
 
  const result = await UsersService.getAllDB()

  sendResponse<User[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Fetched Users',
    data: result,
  });
});



const getSingleDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UsersService.getSingleData(id);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get user ${id}`,
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
const data = req?.body;

  const result = await UsersService.updateItoDb(id,data);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully updated ${id}`,
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;


  const result = await UsersService.deleteFromDb(id)

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully deleted ${id}`,
    data: result,
  });
});

export const UsersController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb};
