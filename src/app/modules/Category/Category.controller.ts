
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const CategoryController = {insertDB};
