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
  FormControl,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useChatMetadata, useMessages } from "../hooks/firebaseHooks";
import { UserContext } from "../helpers/UserContext";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import LiveChatSwitch from "./LiveChatSwitch";

const LiveChat: React.FC = () => {
  const { chatId } = useParams();
  const { user } = React.useContext(UserContext);
  const messages = useMessages(chatId!);
  const chatMetadata = useChatMetadata(chatId!);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(false);
  const [initiatedConference, setInitiatedConference] = React.useState(false);
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

  const createConference = () => {
    if (chatMetadata && chatMetadata["active"]) {
      setInitiatedConference(true);
      fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/create_conference/${chatMetadata["id"]}`,
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

  const transferCallToConference = () => {
    if (chatMetadata && chatMetadata["active"]) {
      fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/transfer_call_to_conference/${chatMetadata["id"]}`,
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
            message,
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

  const setUseGpt3Response = async (
    useGpt3Response: boolean
  ): Promise<boolean> => {
    if (chatMetadata && chatMetadata["active"]) {
      const response = await fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/set_use_gpt3_response/${chatMetadata["id"]}`,
        {
          method: "POST",
          body: JSON.stringify({
            use_gpt3_response: useGpt3Response,
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

  const setAllowHumanToCutOffBot = async (
    allowHumanToCutOffBot: boolean
  ): Promise<boolean> => {
    if (chatMetadata && chatMetadata["active"]) {
      const response = await fetch(
        `https://${process.env.REACT_APP_BACKEND_URL}/set_allow_human_to_cut_off_bot/${chatMetadata["id"]}`,
        {
          method: "POST",
          body: JSON.stringify({
            allow_human_to_cut_off_bot: allowHumanToCutOffBot,
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
            <VStack width="100%">
              <HStack>
                {chatMetadata &&
                  chatMetadata["active"] &&
                  chatMetadata["useGpt3Response"] !== undefined && (
                    <LiveChatSwitch
                      label="Respond with GPT-3"
                      onChange={(event) =>
                        setUseGpt3Response(event.target.checked)
                      }
                      isChecked={chatMetadata["useGpt3Response"]}
                    />
                  )}
                {chatMetadata &&
                  chatMetadata["active"] &&
                  chatMetadata["useGpt3Response"] &&
                  chatMetadata["allowHumanToCutOffBot"] !== undefined && (
                    <LiveChatSwitch
                      label="Allow human to cut off bot response"
                      onChange={(event) => {
                        setAllowHumanToCutOffBot(event.target.checked);
                      }}
                      isChecked={chatMetadata["allowHumanToCutOffBot"]}
                    />
                  )}
              </HStack>
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
                  {/* {chatMetadata && chatMetadata["active"] && (
                    <Box
                      width="100%"
                      borderBottomRadius="xl"
                      bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                    >
                      <MessageInput onSubmit={sendMessage} />
                    </Box>
                  )} */}
                </VStack>
              </Box>
            </VStack>
          </Flex>
          <HStack>
            {chatMetadata && chatMetadata["active"] && (
              <Button onClick={endCall}>End call</Button>
            )}
            {/* {chatMetadata &&
              chatMetadata["active"] &&
              chatMetadata["user"] !== "anonymous" &&
              !chatMetadata["readyForConference"] && (
                <Button
                  disabled={initiatedConference}
                  onClick={createConference}
                >
                  Create conference
                </Button>
              )}
            {chatMetadata &&
              chatMetadata["active"] &&
              chatMetadata["user"] !== "anonymous" &&
              chatMetadata["readyForConference"] && (
                <Button onClick={transferCallToConference}>
                  Transfer call to conference
                </Button>
              )} */}
            <Button onClick={() => navigate("/")}>Go Back</Button>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default LiveChat;
