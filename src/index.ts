import { app } from "./app";

const start = (): void => {
  console.log("Starting up........");
  if (
    !process.env.CLIENT_URL ||
    !process.env.NYLAS_API_SERVER ||
    !process.env.NYLAS_CLIENT_ID ||
    !process.env.NYLAS_CLIENT_SECRET ||
    !process.env.OPENAI_API_KEY
  ) {
    throw new Error(
      "CLIENT_URL, NYLAS_API_SERVER, NYLAS_CLIENT_ID, OPENAI_API_KEY, and NYLAS_CLIENT_SECRET must be defined"
    );
  }

  const port = process.env.PORT || 8000;

  app.listen(port, () =>
    console.log(
      `app started on port ${port} in ${
        process.env.NODE_ENV !== "production"
          ? "Development"
          : process.env.NODE_ENV
      } mode`
    )
  );
};

start();
