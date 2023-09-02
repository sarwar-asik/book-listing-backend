
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

  // eslint-disable-next-line no-unused-vars
  const newArray = result.map(({ password, ...rest }) => rest);

  sendResponse<Partial<User>[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Fetched Users',
    data: newArray,
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

  const {password,...resData} = result;

  console.log("🚀 ~ file: Users.controller.ts:59 ~ updateIntoDb ~ password:", password)

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User updated successfully`,
    data: resData,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;


  const result = await UsersService.deleteFromDb(id)

  const {password,...resData} = result;
  console.log("🚀 ~ file: Users.controller.ts:77 ~ deleteFromDb ~ password:", password)

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Users deleted successfully`,
    data: resData,
  });
});

export const UsersController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb};
