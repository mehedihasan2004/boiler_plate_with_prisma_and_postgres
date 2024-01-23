import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.createUser(req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully!",
    data,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { meta, data } = await UserService.getUsers();

  sendResponse<User[]>(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully!",
    meta,
    data,
  });
});

export const UserController = { createUser, getUsers };
