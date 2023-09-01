import { Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AUthService } from "./Auth.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";


const signUpDB = catchAsync(async(req:Request,res:Response)=>{
    const userData = req?.body;
    const result = await  AUthService.insertDb(userData)

   if(result){
    sendResponse<User>(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Successfully Sign UP",
        data:result
    })
   }
})


export const AuthController ={signUpDB}