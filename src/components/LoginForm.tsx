import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { HStack, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

interface LoginFormProps {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  onSubmit: (event: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  phoneNumber,
  setPhoneNumber,
  onSubmit,
}) => {
  return (
    <VStack paddingBottom="40px">
      <Text as="b" fontSize="70px" padding={"3%"}>
        PrankGPT
      </Text>

      <Text fontSize="20px" padding="10px">
        Verify your phone number to start using PrankGPT!
      </Text>

      <form onSubmit={onSubmit}>
        <HStack>
          <CustomPhoneInput
            onChange={setPhoneNumber}
            value={phoneNumber}
            defaultCountry={"US"}
          />
          <Button type="submit">Enter</Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default LoginForm;
