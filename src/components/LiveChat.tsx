import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LiveChatProps {}

function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
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
        {messages.map((message) => {
          const sender: string = message["sender"];
          const parsedMessage: string = message["message"];

          return (
            <Text>
              {sender.toLowerCase()}: {parsedMessage.toLowerCase()}
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
