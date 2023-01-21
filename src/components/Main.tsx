import React from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Textarea,
  Center,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";
import PrankForm, { InitiateChatResponse } from "./PrankForm";
import Login from "./Login";

const Main: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);

  const onInitiateChatResponse = (data: InitiateChatResponse) => {
    if (data.success) {
      const chatId = data.chatId;
      navigate(`/chat/${chatId}`);
    }
  };

  return (
    <>
      <PrankForm
        user={user}
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
            <Login onLogin={() => setShowVerificationModal(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
