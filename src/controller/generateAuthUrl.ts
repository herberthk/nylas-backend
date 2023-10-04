import type { Request, Response } from "express";
import Nylas from "nylas";
import { Scope } from "nylas/lib/models/connect";

export const authUrl = async (
  req: Request<never, never, { email_address: string; success_url: string }>,
  res: Response
): Promise<Response<string>> => {
  const { email_address: email, success_url: url } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  const CLIENT_URI = process.env.CLIENT_URL;
  try {
    const authUrl = await Nylas.urlForAuthentication({
      loginHint: email,
      redirectURI: CLIENT_URI + url,
      scopes: [Scope.Calendar, Scope.EmailModify, Scope.EmailSend],
    });
    return res.send(authUrl);
  } catch (error) {
    console.log("Failed to generateAuthUrl", error);
  }

  return res.send(authUrl);
};
