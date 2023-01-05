import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { Chat } from "./Chats";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatHighlightProps {
  chat: Chat;
  setChatSelected: (id: number) => void;
}

const ChatHighlight: React.FC<ChatHighlightProps> = ({
  chat,
  setChatSelected,
}) => {
  return (
    <Box height="70px" bg="white" onClick={() => setChatSelected(chat.id)}>
      <VStack spacing="0" align="start" paddingStart="10px">
        <Text as="b" fontSize="20px">
          {chat.recipient}
        </Text>
        <Text> {chat.messages[0].content}</Text>
      </VStack>
    </Box>
  );
};

export default ChatHighlight;
