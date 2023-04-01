import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { HStack, VStack, Text, Box, Center } from "@chakra-ui/layout";
import { Button, Checkbox, Select, Textarea } from "@chakra-ui/react";
import { UserType } from "../helpers/UserContext";

export type InitiateChatResponse = {
  success: boolean;
  chatId?: string;
};

const PrankForm = ({
  user,
  startVerification,
  onInitiateChatResponse,
}: {
  user: UserType | null;
  startVerification: () => void;
  onInitiateChatResponse: (data: InitiateChatResponse) => void;
}) => {
  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);
  const [voice, setVoice] = React.useState("marv");

  const initiateCall = (
    to_phone: string,
    from_phone: string | undefined,
    prompt: string,
    anonymous: boolean,
    voice: string
  ): void => {
    if (!from_phone && !anonymous) {
      startVerification();
      return onInitiateChatResponse({ success: false });
    }
    if (to_phone === "" || prompt === "") {
      alert("Please fill out all fields");
      return onInitiateChatResponse({ success: false });
    }
    if (from_phone === to_phone && !anonymous) {
      alert("If you're going to call yourself, please check the anonymous box");
      return onInitiateChatResponse({ success: false });
    }
    const userId = user?.id || "anonymous";
    fetch(
      `https://${process.env.REACT_APP_BACKEND_URL}/initiate_chat/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({
          to_phone,
          from_phone,
          prompt,
          anonymous,
          voice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          const data = await response.json();
          alert(data.error);
          throw new Error(data.error);
        }
      })
      .then((data) =>
        onInitiateChatResponse({ success: true, chatId: data.chat_id })
      );
  };

  return (
    <VStack>
      <Text as="b" fontSize="70px" padding={"3%"}>
        PrankGPT
      </Text>
      <Text fontSize="20px" padding="10px">
        1. Enter the phone number of the person you want to prank
      </Text>
      <CustomPhoneInput
        onChange={setReceiverPhoneNumber}
        value={receiverPhoneNumber}
      />
      <Text fontSize="20px" padding="10px">
        2. Enter a prompt to instruct the AI with what to talk about
      </Text>
      <Select
        width="40%"
        onChange={(event) => setVoice(event.target.value)}
        value={voice}
      >
        <option value="marv">Marv</option>
        <option value="zephyr">Zephyr (Voice provided by rime.ai!)</option>
      </Select>
      <Text fontSize="20px" padding="10px">
        3. Enter a prompt to instruct the AI with what to talk about
      </Text>
      <Textarea
        placeholder="e.g. tell Ajay that he's been accepted to Hogwarts"
        width={"40%"}
        minWidth={"300px"}
        height={"150px"}
        fontSize={"15px"}
        padding={"10px"}
        onChange={(text) => setPrompt(text.target.value)}
      />
      {/* <Text fontSize="20px" padding="10px">
        4. Do you want to call using your number or remain anonymous?
      </Text>
      <Checkbox
        defaultChecked={false}
        size="lg"
        onChange={() => {
          setAnonymous(!anonymous);
        }}
      >
        Remain anonymous
      </Checkbox> */}
      <Box padding="10px" width="100%">
        <Center>
          <Button
            width={"30%"}
            minWidth={"225px"}
            padding="10px"
            colorScheme="blue"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              initiateCall(
                receiverPhoneNumber,
                user?.phoneNumber,
                prompt,
                anonymous,
                voice
              )
            }
          >
            Start call!
          </Button>
        </Center>
      </Box>
    </VStack>
  );
};

export default PrankForm;
