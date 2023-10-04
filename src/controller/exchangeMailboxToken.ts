import type { Request, Response } from "express";
import Nylas from "nylas";
import type { User } from "src/types";

import { mockDB } from "../utils/mock-db";
export const exchangeMailboxToken = async (
  req: Request<never, never, { token: string }>,
  res: Response
): Promise<Response<Pick<User, "emailAddress" | "id">> | undefined> => {
  const { token } = req.body;
  try {
    const { accessToken, emailAddress } = await Nylas.exchangeCodeForToken(
      token
    );

    // Normally store the access token in the DB
    console.log("Access Token was generated for: " + emailAddress);

    // Replace this mock code with your actual database operations
    const user = await mockDB.createOrUpdateUser(emailAddress, {
      accessToken,
      emailAddress,
    });
    // Return an authorization object to the user
    return res.json({
      id: user.id,
      accessToken,
      emailAddress: user.emailAddress,
    });
  } catch (error) {
    console.log("Access Token was not generated due to error", error);
  }
};
