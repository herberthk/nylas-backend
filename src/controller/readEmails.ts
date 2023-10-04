import type { Request, Response } from "express";
import Nylas from "nylas";
export const readEmails = async (
  req: Request,
  res: Response
): Promise<Response<unknown> | undefined> => {
  const user = res.locals.user;
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  try {
    const nylas = Nylas.with(user.accessToken);
    // type Threads = Awaited<ReturnType<typeof nylas.threads.list>>
    const threads = await nylas.threads.list({ limit: 15, expanded: true });
    return res.json(threads);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
