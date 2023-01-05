import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Container flex="1">
      <Center h="100vh">
        <Stack>
          <Center>
            <Heading>Oops!</Heading>
          </Center>
          <Center>
            <Text>Sorry, an unexpected error has occurred.</Text>
          </Center>
        </Stack>
      </Center>
    </Container>
  );
};

export default ErrorPage;
