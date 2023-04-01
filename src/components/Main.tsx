import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../helpers/SessionContext";
import PrankForm, { InitiateChatResponse } from "./PrankForm";
import Login from "./Login";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
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
      title: "Verified number successfully",
      description:
        "Calls from PrankGPT will appear as though they are coming from your number",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <PrankForm
        startVerification={() => setShowVerificationModal(true)}
        onInitiateChatResponse={onInitiateChatResponse}
      />
      <Modal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Login onLogin={onLogin} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
