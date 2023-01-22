import React from "react";
import { getMessages, getChatMetadata } from "../services/firebase";

export const useMessages = (chatId: string) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getMessages(chatId, setMessages);
    return unsubscribe;
  }, [chatId]);

  return messages;
};

export const useChatMetadata = (chatId: string) => {
  const [chatMetadata, setChatMetadata] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = getChatMetadata(chatId, setChatMetadata);
    return unsubscribe;
  }, [chatId]);

  return chatMetadata;
};
