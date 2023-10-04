import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import type { Application } from "express";
import express from "express";
import morgan from "morgan";
import Nylas from "nylas";
import { WebhookTriggers } from "nylas/lib/models/webhook";
import { openWebhookTunnel } from "nylas/lib/services/tunnel";

import { __prod__ } from "./constants";
import nylas from "./routes/nylas";

const app: Application = express();
app.set("trust proxy", true);

// Load env variables
if (!__prod__) {
  dotenv.config();
  // Logging
  app.use(morgan("dev"));
}

// Body parser
// Use body-parser to parse JSON requests
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    // optionsSuccessStatus: 200,
  })
);

// Initialize the Nylas SDK using the client credentials
Nylas.config({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  clientId: process.env.NYLAS_CLIENT_ID!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  clientSecret: process.env.NYLAS_CLIENT_SECRET!,
  apiServer: process.env.NYLAS_API_SERVER,
});

// Before we start our backend, we should register our frontend
// as a redirect URI to ensure the auth completes

(async () => {
  try {
    // Before we start our backend, we should register our frontend as a redirect
    // URI to ensure the auth completes
    const applicationDetails = await Nylas.application({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      redirectUris: [process.env.CLIENT_URL!],
    });
    console.log(
      "Application registered. Application Details: ",
      JSON.stringify(applicationDetails)
    );
  } catch (error) {
    console.log("Application not registered. Because of this error: ", error);
  }

  try {
    // Start the Nylas webhook
    const webhookDetails = await openWebhookTunnel({
      // Handle when a new message is created (sent)
      onMessage: (delta) => {
        switch (delta.type) {
          case WebhookTriggers.AccountConnected:
            console.log(
              "Webhook trigger received, account connected. Details: ",
              JSON.stringify(delta.objectData, undefined, 2)
            );
            break;
        }
      },
    });
    console.log(`Webhook tunnel registered. Webhook ID: ${webhookDetails.id}`);
  } catch (error) {
    console.log("Webhook tunnel not registered. due to this error", error);
  }
})();

/**
 * Route for accessing Nylas API
 */
app.use("/nylas", nylas);

export { app };
