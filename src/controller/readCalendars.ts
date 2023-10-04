import type { Request, Response } from "express";
import Nylas from "nylas";
export const readCalendars = async (
  req: Request,
  res: Response
): Promise<Response<unknown> | undefined> => {
  const user = res.locals.user;
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  try {
    const calendars = await Nylas.with(user.accessToken)
      .calendars.list()
      .then((calendars) => calendars);

    return res.json(calendars);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
