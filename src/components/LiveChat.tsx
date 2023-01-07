import React from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Link,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useChatMetadata, useMessages } from "../hooks/firebaseHooks";
import { timestampToString } from "../helpers/ChatHelpers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LiveChatProps {}

const LiveChat: React.FC<LiveChatProps> = () => {
  const { chatId } = useParams();
  const messages = useMessages(chatId!);
  const chatMetadata = useChatMetadata(chatId!);
  const navigate = useNavigate();

  const endCall = () => {
    if (chatMetadata && chatMetadata["active"]) {
      fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/end_call/${chatMetadata["id"]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());
    }
  };

  const ringing =
    messages.length === 0 && (!chatMetadata || chatMetadata["active"]);

  return (
    <VStack width="100%">
      <Text as="b" fontSize="70px" padding={"3%"}>
        PrankGPT
      </Text>
      {ringing ? (
        <HStack>
          <PhoneIcon />
          <Text>Ringing...</Text>
        </HStack>
      ) : (
        <>
          <Box
            width={"50%"}
            minHeight={"50vh"}
            borderWidth="1px"
            borderRadius="xl"
          >
            <VStack>
              <>
                {messages.map((message) => {
                  const sender: string = message["sender"];
                  const parsedMessage: string = message["message"];

                  if (sender === "PHONE") {
                    return (
                      <Flex w="100%">
                        <Flex
                          bg="gray.100"
                          color="black"
                          maxW="350px"
                          my="1"
                          mx="1"
                          p="3"
                          borderRadius={"xl"}
                        >
                          <Text>{parsedMessage.toLowerCase()}</Text>
                        </Flex>
                      </Flex>
                    );
                  } else if (sender === "BOT") {
                    return (
                      <Flex w="100%" justify="flex-end">
                        <Flex
                          bg="blue.100"
                          color="black"
                          maxW="350px"
                          my="1"
                          mx="1"
                          p="3"
                          borderRadius={"xl"}
                        >
                          <Text>{parsedMessage.toLowerCase()}</Text>
                        </Flex>
                      </Flex>
                    );
                  } else if (sender === "ROBOANSWERER") {
                    return (
                      <VStack>
                        <Text fontStyle="italic">
                          {timestampToString(message["timestamp"])}
                        </Text>
                        <Text fontStyle="italic">{parsedMessage}</Text>
                      </VStack>
                    );
                  }
                })}
              </>
              {chatMetadata && chatMetadata["active"] === false && (
                <Text fontStyle="italic">Call has ended</Text>
              )}
            </VStack>
          </Box>
          <HStack>
            {chatMetadata && chatMetadata["active"] && (
              <Button onClick={endCall}>End Call</Button>
            )}
            {chatMetadata && chatMetadata["recordingUrl"] && (
              <Button>
                <Link href={chatMetadata["recordingUrl"]}>View recording</Link>
              </Button>
            )}
            <Button onClick={() => navigate("/")}>Go Back</Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default LiveChat;
