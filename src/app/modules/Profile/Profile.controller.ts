
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProfileService } from "./Profile.service";
import { User } from "@prisma/client";

const getProfileDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProfileService.getProfileData(id)

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully get user ${id}`,
    data: result,
  });
});

export const ProfileController = {getProfileDataById};
