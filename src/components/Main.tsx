import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useToast,
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../helpers/SessionContext";
import PrankForm, { InitiateChatResponse } from "./PrankForm";
import Login from "./Login";
import { VerificationType } from "../helpers/verification";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
  const [verificationType, setVerificationType] =
    React.useState<VerificationType>("normal");
  const toast = useToast();

  const onInitiateChatResponse = (data: InitiateChatResponse) => {
    if (data.success) {
      const chatId = data.chatId;
      navigate(`/chat/${chatId}`);
    }
  };

  const onLogin = () => {
    setShowVerificationModal(false);
    toast({
      title: "Logged in successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex maxHeight={"100vh"} justify={"center"}>
      <VStack>
        <PrankForm
          startVerification={(verificationType: VerificationType) => {
            setVerificationType(verificationType);
            setShowVerificationModal(true);
          }}
          onInitiateChatResponse={onInitiateChatResponse}
        />
        <Modal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Login verificationType={verificationType} onLogin={onLogin} />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box
          as="a"
          href="https://github.com/vocodedev/vocode-python"
          target="_blank"
          rel="noopener noreferrer"
          cursor="pointer"
          _hover={{
            opacity: 0.7,
          }}
        >
          <VStack>
            <Text fontSize={"s"}>Built with ❤️ with</Text>
            <HStack>
              <Image
                src={`/${colorMode}_logo.svg`}
                height={10}
                paddingRight={3}
              />
              <Image src="/rimelabslogo.png" height={20} paddingLeft={3} />
            </HStack>
            <HStack>
              <img
                src="https://img.shields.io/github/stars/vocodedev/vocode-python?style=social"
                height="10%"
                alt="vocode"
              />
              {colorMode === "light" ? (
                <a
                  href="https://www.producthunt.com/posts/prankgpt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-prankgpt"
                  target="_blank"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=386990&theme=light"
                    alt="PrankGPT - Prank&#0032;call&#0032;your&#0032;friends&#0032;with&#0032;an&#0032;AI&#0032;that&#0032;can&#0032;say&#0032;anything | Product Hunt"
                    style={{ width: "125px", height: "27px;" }}
                    width="125"
                    height="27"
                  />
                </a>
              ) : (
                <a
                  href="https://www.producthunt.com/posts/prankgpt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-prankgpt"
                  target="_blank"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=386990&theme=dark"
                    alt="PrankGPT - Prank&#0032;call&#0032;your&#0032;friends&#0032;with&#0032;an&#0032;AI&#0032;that&#0032;can&#0032;say&#0032;anything | Product Hunt"
                    style={{ width: "125px", height: "27px;" }}
                    width="125"
                    height="27"
                  />
                </a>
              )}
            </HStack>

            <Text fontSize={"s"}>
              Vocode is an open source library for building voice-based LLM
              apps. Voices provided via Rime Labs and Google Cloud.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Main;
