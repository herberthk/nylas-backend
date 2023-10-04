import type { NextFunction, Request, Response } from "express";

import { mockDB } from "../utils/mock-db";
// Middleware to check if the user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
  if (!req.headers.authorization) {
    return res.status(401).json("Unauthorized");
  }

  // Query our mock db to retrieve the stored user access token
  const user = await mockDB.findUser(req.headers.authorization);

  if (!user) {
    return res.status(401).json("Unauthorized");
  }

  // Add the user to the response locals
  res.locals.user = user;

  next();
};
