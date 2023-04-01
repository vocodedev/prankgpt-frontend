import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { HStack, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { VerificationType } from "../helpers/verification";

interface LoginFormProps {
  verificationType: VerificationType;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  onSubmit: (event: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  verificationType,
  phoneNumber,
  setPhoneNumber,
  onSubmit,
}) => {
  return (
    <VStack paddingBottom="40px">
      <Text fontSize="20px" padding="10px">
        {verificationType === "normal"
          ? "Login with your phone number to start using PrankGPT!"
          : "Enter your phone number so we can verify your caller ID"}
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
