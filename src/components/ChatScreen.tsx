import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Chat } from "./Chats";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatProps {
  chat: Chat | undefined;
}

const ChatScreen: React.FC<ChatProps> = ({ chat }) => {
  return (
    <Box h="100vh" w="100%" bg="white">
      <VStack spacing="0" align="start" paddingStart="10px">
        {chat?.messages.map((message) => (
          <Text>{message.content}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export default ChatScreen;
