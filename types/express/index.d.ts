declare namespace Express {
  // Define an interface for your custom properties
  interface User {
    id?: string;
    accessToken: string;
    emailAddress: string;
  }

  interface Locals {
    user: User | null;
  }
  // Extend the Response interface with your Locals interface
  interface Response {
    locals: Locals;
  }
}
