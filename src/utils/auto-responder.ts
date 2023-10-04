import OpenAI from "openai";

import type { AutoResponderProps } from "../types";

export const autoResponderAi = async (
  props: AutoResponderProps
): Promise<string | null | undefined> => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Construct message input for the AI to process
    const userInput = `
      can you give a response to this email: ${props.message}. 
      Sender is ${props.sender}. Receiver is ${props.receiver}
      `;

    // Call the API with user input & history
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    });

    // Get completion text/content
    const response = completion.choices[0].message?.content;

    return response;
  } catch (error) {
    console.error("Oops something went wrong because", error);
  }
};
