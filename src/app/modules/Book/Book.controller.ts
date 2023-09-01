
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./Category.service";
import { Category } from "@prisma/client";

const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CategoryService.insertDB(data)

  sendResponse<Category>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Category',
    data: result,
  });
});


const getAllDB = catchAsync(async (req: Request, res: Response) => {
 
  const result = await CategoryService.getAllDB()

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Fetched Category',
    data: result,
  });
});



const getSingleDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.getSingleData(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get Category ${id}`,
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
const data = req?.body;

  const result = await CategoryService.updateItoDb(id,data);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully updated ${id}`,
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;


  const result = await CategoryService.deleteFromDb(id)

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully deleted ${id}`,
    data: result,
  });
});

export const CategoryController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb};
