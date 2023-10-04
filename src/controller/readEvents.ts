import type { Request, Response } from "express";
import Nylas from "nylas";

type RequestProps = {
  calendarId: string;
  startsAfter: string;
  endsBefore: string;
  limit: string;
};
export const readEvents = async (
  req: Request<never, never, never, RequestProps>,
  res: Response
): Promise<Response<unknown> | undefined> => {
  const user = res.locals.user;

  const { calendarId, startsAfter, endsBefore, limit } = req.query;
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  try {
    const events = await Nylas.with(user.accessToken)
      .events.list({
        calendar_id: calendarId,
        starts_after: startsAfter,
        ends_before: endsBefore,
        limit: limit,
      })
      .then((events) => events);
    return res.json(events);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
