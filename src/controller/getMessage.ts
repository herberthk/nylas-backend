import type { Request, Response } from "express";
import Nylas from "nylas";
export const getMessage = async (
  req: Request<never, never, never, { id: string }>,
  res: Response
): Promise<Response<unknown> | undefined> => {
  const id = req.query.id;
  const user = res.locals.user;
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  if (!id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  try {
    const nylas = Nylas.with(user.accessToken);

    const message = await nylas.messages.find(id);

    return res.json(message);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
