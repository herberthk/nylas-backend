import type { Request, Response } from "express";
import Nylas from "nylas";
export const getFile = async (
  req: Request<never, never, never, { id: string }>,
  res: Response
): Promise<Response<unknown> | undefined> => {
  const user = res.locals.user;
  const { id } = req.query;
  if (!user) {
    return res.status(404).json({ message: "Something went wrong" });
  }
  if (!id) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  try {
    const nylas = Nylas.with(user.accessToken);

    const file = await nylas.files.find(id);

    // Files will be returned as a binary object
    const fileData = await file.download();
    return res.end(fileData?.body);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
