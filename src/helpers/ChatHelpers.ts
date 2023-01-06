import { Message } from "../components/LiveChat";

export const getMessages = (): Message[] => {
  return [
    {
      sender: "user",
      message: "hi there",
    },
    {
      sender: "PrankGPT",
      message: "hello, friend",
    },
  ];
};
