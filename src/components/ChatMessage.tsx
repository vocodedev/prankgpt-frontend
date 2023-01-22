import { Flex, Text, VStack } from "@chakra-ui/layout";
import { timestampToString } from "../helpers/ChatHelpers";

type Message = {
  sender: string;
  message: string;
  timestamp: number;
};

const MessageBubble = ({
  text,
  bg,
  justify = "flex-start",
}: {
  text: string;
  bg: string;
  justify?: string;
}) => {
  return (
    <Flex w="100%" paddingBottom={2} justify={justify}>
      <Flex
        bg={bg}
        color="black"
        maxW="350px"
        my="1"
        mx="1"
        p="3"
        borderRadius={"xl"}
      >
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};

const ChatMessage = ({ message }: { message: Message }) => {
  const sender: string = message["sender"];
  const parsedMessage: string = message["message"];

  if (sender === "PHONE") {
    return <MessageBubble bg="gray.100" text={parsedMessage.toLowerCase()} />;
  } else if (sender === "BOT") {
    return (
      <MessageBubble
        bg="blue.100"
        text={parsedMessage.toLowerCase()}
        justify={"flex-end"}
      />
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
  } else if (sender === "USER") {
    return (
      <MessageBubble
        bg="green.100"
        text={parsedMessage.toLowerCase()}
        justify={"flex-end"}
      />
    );
  } else {
    return <></>;
  }
};

export default ChatMessage;
