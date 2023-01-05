import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/layout";

const Login: React.FC = ({}) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/verify?${createSearchParams({ phoneNumber })}`);
  };

  return (
    <Container flex="1">
      <Center h="100vh">
        <HStack>
          <form onSubmit={onSubmit}>
            <Heading>Welcome to Delphi</Heading>
            <CustomPhoneInput
              onChange={setPhoneNumber}
              value={phoneNumber}
              defaultCountry={"US"}
            />
          </form>
        </HStack>
      </Center>
    </Container>
  );
};

export default Login;
