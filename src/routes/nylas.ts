import express from "express";

import {
  authUrl,
  createEvent,
  exchangeMailboxToken,
  getFile,
  getMessage,
  readCalendars,
  readEmails,
  readEvents,
  sendEmail,
} from "../controller";
import { isAuthenticated } from "../midleware";

export const router = express.Router();

/**
 * @description This route builds the URL for
// authenticating users to your Nylas application via Hosted Authentication
 * @route  /generate-auth-url
 */
router.post("/generate-auth-url", authUrl);

/**
 * @description This route exchanges an authorization code for an access token and sends the details of the authenticated user to the client
 * @route  /exchange-mailbox-token
 */
router.post("/exchange-mailbox-token", exchangeMailboxToken);

/**
 * @description Add route for getting 20 latest calendar events
 * @route  /nylas/read-events
 */
router.get("/read-events", isAuthenticated, readEvents);
/**
 * @description Add route for getting 20 latest calendar events
 * @route  /read-calendars
 */
router.get("/read-calendars", isAuthenticated, readCalendars);

/**
 * @description Add route for creating calendar events
 * @route  /create-event
 */
router.post("/create-event", isAuthenticated, createEvent);

/**
 * @description Add route for sending email
 * @route  /send-email
 */
router.post("/send-email", isAuthenticated, sendEmail);

/**
 * @description Add route for reading emails
 * @route  /read-emails
 */
router.get("/read-emails", isAuthenticated, readEmails);

/**
 * @description Add route for reading message
 * @route  /message
 */
router.get("/message", isAuthenticated, getMessage);

/**
 * @description Add route for getting file
 * @route  /file
 */
router.get("/file", isAuthenticated, getFile);

export default router;
