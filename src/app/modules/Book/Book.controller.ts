
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./Book.service";
import { Book } from "@prisma/client";
import pick from "../../../shared/pick";
import { IGenericResponse } from "../../../interfaces/common";


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

  const booksFilterableFields = [
    'search',
    'minPrice',
    'maxPrice',
    'category',
    'roomId',
    'facultyId',
    'title',
    'price',
    'genre',
    'publicationDate'
]

  const filters = pick(req.query,booksFilterableFields);

  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder'])


  
 
  const result = await BookService.getAllDB(filters,options)

  sendResponse<IGenericResponse<Book[]>>(res, {
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
    message: `Book fetched successfully`,
    data: result,
  });
});


const getSingleByCategoryDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId;

  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder'])

  const result = await BookService.getSingleByCategoryData(id,options)

  sendResponse<IGenericResponse<Book[] | Book>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Books with associated category data fetched successfully`,
    data: result?.data,
    meta:result?.meta
  });
});

const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
const data = req?.body;



// console.log(id,data,'dddddd');

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

export const BookController = {insertDB,getAllDB,getSingleDataById,updateIntoDb,deleteFromDb,getSingleByCategoryDataById};
