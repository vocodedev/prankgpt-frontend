import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Center, HStack, VStack, Text } from "@chakra-ui/layout";

const Login: React.FC = ({}) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/verify?${createSearchParams({ phoneNumber })}`);
  };

  return (
    <VStack>
      <Text as="b" fontSize="70px" padding={"3%"}>
        Prank GPT
      </Text>

      <Text fontSize="20px" padding="10px">
        Verify your phone number to start using Prank GPT!
      </Text>

      <form onSubmit={onSubmit}>
        <CustomPhoneInput
          onChange={setPhoneNumber}
          value={phoneNumber}
          defaultCountry={"US"}
        />
      </form>
    </VStack>
  );
};

export default Login;
