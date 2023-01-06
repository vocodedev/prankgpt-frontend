import React, { useEffect } from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { getMessages } from "../helpers/ChatHelpers";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LiveChatProps {}

export interface Message {
  message: string;
  sender: string;
}

const LiveChat: React.FC<LiveChatProps> = () => {
  const { chatId } = useParams();
  const messages = useMessages(chatId);
  const navigate = useNavigate();

  return (
    <VStack width="100%">
      <Text as="b" fontSize="70px" padding={"3%"}>
        Prank GPT
      </Text>
      <Box width={"50%"} minHeight={"50vh"} borderWidth="1px" borderRadius="xl">
        {messages.map((message, i) => {
          // let parsedMessage = JSON.parse(message.message).message;
          // let sender = JSON.parse(message.message).sender;

          return (
            <Text>
              {JSON.stringify(message)}
              {/* {message.sender}: {message.message} */}
            </Text>
          );
        })}
      </Box>
      <HStack>
        <Button>End Call</Button>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </HStack>
    </VStack>
  );
};

export default LiveChat;
