import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Center, HStack, VStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

const Login: React.FC = ({}) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/verify?${createSearchParams({ phoneNumber })}`);
  };

  return (
    <VStack>
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

export default Login;
