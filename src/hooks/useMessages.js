import React from "react";
import { getMessages } from "../services/firebase";

export const useMessages = (chatId) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getMessages(chatId, setMessages);
    return unsubscribe;
  }, [chatId]);

  return messages;
};
