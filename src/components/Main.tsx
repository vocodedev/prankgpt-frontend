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
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainProps {}

const URL = "https://28aa-174-160-87-247.ngrok.io";

const Main: React.FC<MainProps> = () => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [isChatLive, setIsChatLive] = React.useState(false);

  function initiateCall(to: string, from: string, prompt: string): void {
    /*
    if any fields are empty, flag them 
    and return

    if the user is not verified, 
    make them verify their phone number

    once verified, trigger the call

    */
    if (from === "" || prompt === "") {
      alert("Please fill out all fields");
      return;
    }
    navigate("/chat/1");
    // setIsChatLive(!isChatLive);
  }

  return (
    <VStack>
      <Text as="b" fontSize="70px" padding={"3%"}>
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
      <Checkbox defaultChecked={false} size="lg">
        Remain anonymous
      </Checkbox>
      <Box padding="10px" width="100%">
        <Center>
          <Button
            width={"30%"}
            minWidth={"225px"}
            padding="10px"
            colorScheme="blue"
            onClick={() => initiateCall(receiverPhoneNumber, " ", prompt)}
          >
            Start call!
          </Button>
        </Center>
      </Box>
    </VStack>
  );
};

export default Main;
