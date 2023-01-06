import React, { useEffect } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { getMessages } from "../helpers/ChatHelpers";
import { useParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LiveChatProps {}

export interface Message {
  message: string;
}

const LiveChat: React.FC<LiveChatProps> = () => {
  const [messages, setMessages] = React.useState<Message[]>(getMessages());
  const { chatId } = useParams();

  return (
    <VStack width="100%">
      <Text as="b" fontSize="70px" padding={"3%"}>
        Prank GPT
      </Text>
      <Box width={"50%"} minHeight={"50vh"} borderWidth="1px" borderRadius="xl">
        {messages.map((message, i) => {
          // let parsedMessage = JSON.parse(message.message).message;
          // let sender = JSON.parse(message.message).sender;

          return <Text>hi</Text>;
        })}
      </Box>
      <Button>End Call</Button>
    </VStack>
  );
};

export default LiveChat;
