// import type { ChatCompletionRequestMessageRoleEnum } from "openai";

export interface User {
  id?: string;
  accessToken: string;
  emailAddress: string;
}

export interface Calendar {
  calendarId: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  participants: string;
}

export interface MessageBody {
  to: {
    name: string;
    email: string;
  };
  from: {
    email: string;
    name: string;
  };
  subject: string;
  body: string;
  plaintext: string;
  replyToMessageId: string;
  type: "reply" | "direct";
}

export type History = {
  user: string;
  assistant?: string;
  // role: ChatCompletionRequestMessageRoleEnum;
  content?: string;
};

export interface AutoResponderProps {
  message: string;
  sender: string;
  receiver: string;
}
