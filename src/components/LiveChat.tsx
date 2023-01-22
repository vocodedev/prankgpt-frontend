import React, { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Link,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useChatMetadata, useMessages } from "../hooks/firebaseHooks";
import { UserContext } from "../helpers/UserContext";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";

const LiveChat: React.FC = () => {
  const { chatId } = useParams();
  const { user } = React.useContext(UserContext);
  const messages = useMessages(chatId!);
  const chatMetadata = useChatMetadata(chatId!);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const userId = user?.id || "anonymous";
    if (chatMetadata && chatMetadata["user"] !== userId) {
      navigate("/");
    } else if (chatMetadata && chatMetadata["user"] === userId) {
      setAuthenticated(true);
    }
  });

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

  const transferCall = () => {
    if (chatMetadata && chatMetadata["active"]) {
      fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/transfer_call/${chatMetadata["id"]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .catch((error) => alert(error));
    }
  };

  const sendMessage = async (message: string): Promise<boolean> => {
    if (chatMetadata && chatMetadata["active"]) {
      const response = await fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/send_message/${chatMetadata["id"]}`,
        {
          method: "POST",
          body: JSON.stringify({
            message: message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data["success"] === true;
    }
    return false;
  };

  const ringing =
    messages.length === 0 && (!chatMetadata || chatMetadata["active"]);

  return !authenticated ? (
    <></>
  ) : (
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
          <Flex width="100%" justifyContent={"center"}>
            <Box
              width={"50%"}
              minHeight={"50vh"}
              borderWidth="1px"
              borderRadius="xl"
            >
              <VStack height="100%" width="100%" spacing={0}>
                <>
                  {messages.map((message) => (
                    <ChatMessage message={message} />
                  ))}
                </>
                <Spacer />
                {chatMetadata && chatMetadata["active"] === false && (
                  <Text paddingBottom={2} fontStyle="italic">
                    Call has ended
                  </Text>
                )}
                {chatMetadata && chatMetadata["active"] && (
                  <Box
                    width="100%"
                    borderBottomRadius="xl"
                    bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                  >
                    <MessageInput onSubmit={sendMessage} />
                  </Box>
                )}
              </VStack>
            </Box>
          </Flex>
          <HStack>
            {chatMetadata && chatMetadata["active"] && (
              <Button onClick={endCall}>End Call</Button>
            )}
            {chatMetadata && chatMetadata["active"] && (
              <Button onClick={transferCall}>Transfer Call</Button>
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
