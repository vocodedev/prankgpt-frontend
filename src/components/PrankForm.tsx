import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { HStack, VStack, Text, Box, Center } from "@chakra-ui/layout";
import { Button, Checkbox, Select, Spinner, Textarea } from "@chakra-ui/react";
import { SessionContext } from "../helpers/SessionContext";
import { isCallerIdVerified, VerificationType } from "../helpers/verification";
import { supabase } from "../services/supabase";
import { loadStripe } from "@stripe/stripe-js";
import { createSubscription } from "../helpers/stripe";

export type InitiateChatResponse = {
  success: boolean;
  chatId?: string;
};

const PrankForm = ({
  startVerification,
  onInitiateChatResponse,
}: {
  startVerification: (verificationType: VerificationType) => void;
  onInitiateChatResponse: (data: InitiateChatResponse) => void;
}) => {
  const { session } = React.useContext(SessionContext);
  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);
  const [voice, setVoice] = React.useState("marv");
  const [callLoading, setCallLoading] = React.useState(false);

  const failInitiateCall = () => {
    setCallLoading(false);
    onInitiateChatResponse({ success: false });
  };

  const maybeWriteToSupabase = async (from_phone: string) => {
    const userId = session?.user?.id;
    if (!userId) {
      return;
    }
    const res = await supabase
      .from("phoneNumbers")
      .select("*")
      .eq("user", userId);

    if (res.error) {
      console.error(res.error);
    } else if (res.data?.length === 0) {
      await supabase
        .from("phoneNumbers")
        .insert([{ user: userId, phoneNumber: from_phone }]);
    }
  };

  const initiateCall = async (
    to_phone: string,
    from_phone: string | undefined,
    prompt: string,
    anonymous: boolean,
    voice: string
  ) => {
    setCallLoading(true);
    if (from_phone && !from_phone.startsWith("+")) {
      from_phone = "+" + from_phone;
    }
    from_phone && (await maybeWriteToSupabase(from_phone));
    const userId = session?.user?.id;
    if (from_phone) {
      const verified = await isCallerIdVerified(from_phone!);
      if (!verified) {
        startVerification("callerId");
        return failInitiateCall();
      } else {
        if (!userId) {
          startVerification("normal");
          return failInitiateCall();
        }
      }
    } else if (!userId) {
      startVerification("normal");
      return failInitiateCall();
    }
    if (to_phone === "" || prompt === "") {
      alert("Please fill out all fields");
      return failInitiateCall();
    }
    if (from_phone === to_phone && !anonymous) {
      anonymous = true;
      console.log("setting anonymous to true to call self");
    }
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
        } else if (response.status === 402) {
          await createSubscription(from_phone!);
        } else {
          const data = await response.json();
          alert(data.detail);
          setCallLoading(false);
          throw new Error(data.detail);
        }
      })
      .then((data) =>
        onInitiateChatResponse({ success: true, chatId: data.chat_id })
      );
  };

  return (
    <VStack>
      <Text as="b" fontSize="70px">
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
        2. Choose your voice
      </Text>
      <Select
        width="65%"
        onChange={(event) => setVoice(event.target.value)}
        value={voice}
      >
        <option value="marv">Marv (the OG evil prankbot)</option>
        <option value="zephyr">
          Zephyr (the gen Z queen; voice by rime.ai!)
        </option>
      </Select>
      <Text fontSize="20px" padding="10px">
        3. Enter a prompt to instruct the AI with what to talk about
      </Text>
      <Textarea
        placeholder="e.g. tell Ajay that he's been accepted to Hogwarts"
        width={"40%"}
        minWidth={"300px"}
        fontSize={"15px"}
        padding={"10px"}
        onChange={(text) => setPrompt(text.target.value)}
      />
      <Box padding="10px" width="100%">
        <Center>
          <Button
            width={"30%"}
            minWidth={"225px"}
            padding="10px"
            colorScheme="blue"
            onClick={async () => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              await initiateCall(
                receiverPhoneNumber,
                session?.user.phone,
                prompt,
                anonymous,
                voice
              );
            }}
          >
            {callLoading && (
              <>
                <Spinner /> &nbsp;
              </>
            )}
            Start call!
          </Button>
        </Center>
      </Box>
    </VStack>
  );
};

export default PrankForm;
