
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./Book.service";
import { Book } from "@prisma/client";


const insertDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookService.insertDB(data)

  sendResponse<Book>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Book',
    data: result,
  });
});


const getAllDB = catchAsync(async (req: Request, res: Response) => {
 
  const result = await BookService.getAllDB()

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Fetched Book',
    data: result,
  });
});



const getSingleDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleData(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get Book ${id}`,
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
const data = req?.body;

  const result = await BookService.updateItoDb(id,data);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully updated ${id}`,
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;


  const result = await BookService.deleteFromDb(id)

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully deleted ${id}`,
    data: result,
  });
});

export const BookController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb};
