import React from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Textarea,
  Center,
  Checkbox,
} from "@chakra-ui/react";
import CustomPhoneInput from "./CustomPhoneInput";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);

  const initiateCall = (
    to: string,
    from: string | undefined,
    prompt: string,
    anonymous: boolean
  ): void => {
    if (!from && !anonymous) {
      navigate("/login");
      return;
    }
    if (to === "" || prompt === "") {
      alert("Please fill out all fields");
      return;
    }
    if (from === to && !anonymous) {
      alert("If you're going to call yourself, please check the anonymous box");
    }
    const userId = user?.id || "anonymous";
    fetch(
      `https://${process.env.REACT_APP_BACKEND_URL}/initiate_chat/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({
          to,
          from,
          prompt,
          anonymous,
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
      .then((data) => {
        const chatId = data.chat_id;
        navigate(`/chat/${chatId}`);
      });
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
        2. Enter a prompt to instruct the AI with what to say.
      </Text>
      <Textarea
        placeholder="Enter a prompt"
        width={"40%"}
        minWidth={"300px"}
        height={"150px"}
        fontSize={"15px"}
        padding={"10px"}
        onChange={(text) => setPrompt(text.target.value)}
      />
      <Text fontSize="20px" padding="10px">
        3. Do you want to call using your number or remain anonymous?
      </Text>
      <Checkbox
        defaultChecked={false}
        size="lg"
        onChange={() => {
          setAnonymous(!anonymous);
        }}
      >
        Remain anonymous
      </Checkbox>
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
                anonymous
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

export default Main;
