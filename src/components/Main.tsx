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

  return (
    <>
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
    </>
  );
};

export default Main;
