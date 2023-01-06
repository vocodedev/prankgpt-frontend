import React from "react";
import { Box, Button, Text, VStack, Textarea, Center } from "@chakra-ui/react";
import Chats, { Chat } from "./Chats";
import Header from "./Header";
import CustomPhoneInput from "./CustomPhoneInput";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");

  function initiateCall(): void {
    if (receiverPhoneNumber === "") {
      alert("Please enter a phone number");
      return;
    }
  }

  return (
    <VStack>
      <Text as="b" fontSize="70px" padding="10%">
        Prank GPT
      </Text>
      <Text fontSize="20px" padding="10px">
        1. Enter the phone number of the person you want to prank
      </Text>
      <CustomPhoneInput
        onChange={setReceiverPhoneNumber}
        value={receiverPhoneNumber}
      />
      <Text fontSize="20px" padding="10px">
        2. Enter a prompt to instruct the AI with what to say.
      </Text>
      {/* TODO fix text alignment */}
      <Textarea
        placeholder="Enter a prompt"
        width={"40%"}
        minWidth={"300px"}
        height={"150px"}
        fontSize={"15px"}
        padding={"10px"}
      />
      <Box padding="10px" width="100%">
        <Center>
          <Button
            width={"30%"}
            padding="10px"
            colorScheme="blue"
            onClick={initiateCall}
          >
            Prank!
          </Button>
        </Center>
      </Box>
    </VStack>
  );
};

export default Main;
