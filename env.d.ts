declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NYLAS_CLIENT_ID: string;
      NYLAS_CLIENT_SECRET: string;
      NYLAS_API_SERVER: string;
      CLIENT_URL: string;
      OPENAI_API_KEY: string;
    }
  }
}

export {}
