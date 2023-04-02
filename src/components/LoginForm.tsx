import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { HStack, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { VerificationType } from "../helpers/verification";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface LoginFormProps {
  verificationType: VerificationType;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setCaptchaToken: (captchaToken: string) => void;
  captchaRef: React.RefObject<any>;
  onSubmit: (event: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  verificationType,
  phoneNumber,
  setPhoneNumber,
  setCaptchaToken,
  captchaRef,
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
        <VStack>
          <HStack>
            <CustomPhoneInput
              onChange={setPhoneNumber}
              value={phoneNumber}
              defaultCountry={"US"}
            />
            <Button type="submit">Enter</Button>
          </HStack>
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY || ""}
            onVerify={(token) => setCaptchaToken(token)}
          />
        </VStack>
      </form>
    </VStack>
  );
};

export default LoginForm;
