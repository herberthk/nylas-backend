import type { Request, Response } from "express";
import Nylas from "nylas";
import Event from "nylas/lib/models/event";

import type { Calendar } from "../types";

export const createEvent = (
  req: Request<never, never, Calendar>,
  res: Response
): Response<Event> => {
  const user = res.locals.user;

  const { calendarId, title, description, startTime, endTime, participants } =
    req.body;

  if (!calendarId || !title || !startTime || !endTime) {
    return res.status(400).json({
      message:
        "Missing required fields: calendarId, title, starTime or endTime",
    });
  }

  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const nylas = Nylas.with(user.accessToken);
  //   const event: CustomEvent = new EventEmitter();
  const event = new Event(nylas);

  event.calendarId = calendarId;
  event.title = title;
  event.description = description;
  event.when.startTime = startTime;
  event.when.endTime = endTime;
  //
  if (participants) {
    //Unnecessary attributes are required in  EventParticipant[] used in event.participants
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    event.participants = participants
      .split(/\s*,\s*/)
      .map((email) => ({ email }));
  }

  event.save();

  return res.json(event);
};
