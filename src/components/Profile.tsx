import React from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Stack,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
import { SessionContext } from "../helpers/SessionContext";

const formatMinutes = (minutesDecimal: number) => {
  let totalSeconds = minutesDecimal * 60;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  // Pad minutes and seconds with zeros if needed
  const minutesFmtd = String(minutes).padStart(2, "0");
  const secondsFmtd = String(seconds).padStart(2, "0");

  return `${minutesFmtd}:${secondsFmtd}`;
};

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session } = React.useContext(SessionContext);
  const [hasPaid, setHasPaid] = React.useState(false);
  const [totalConversationMinutes, setTotalConversationMinutes] =
    React.useState();
  const [freeTrialLimitMinutes, setFreeTrialLimitMinutes] = React.useState();

  React.useEffect(() => {
    if (!session?.user) {
      return;
    }
    fetch(`https://${process.env.REACT_APP_BACKEND_URL}/get_usage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: session.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalConversationMinutes(data.total_conversation_minutes);
        setFreeTrialLimitMinutes(data.free_trial_limit_minutes);
        setHasPaid(data.has_paid);
      });
  });

  return (
    <Box>
      <IconButton
        boxSize={10}
        colorScheme="gray"
        aria-label="Profile"
        variant="outline"
        borderRadius="20px"
        onClick={onOpen}
        icon={<FaUser />}
      />

      {session?.user && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody paddingBottom="20px">
              <Stack spacing={5}>
                <Box>
                  <Text fontWeight="semibold" fontSize="md" color="gray.600">
                    Phone Number
                  </Text>
                  <Text fontSize="lg">+{session?.user.phone}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="md" color="gray.600">
                    Minutes Used
                  </Text>
                  <Text fontSize="lg">
                    {formatMinutes(totalConversationMinutes || 0)}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="md" color="gray.600">
                    Subscription
                  </Text>
                  <Text fontSize="lg" color={hasPaid ? "green.500" : "red.500"}>
                    {hasPaid
                      ? "Active"
                      : `Free Trial (${freeTrialLimitMinutes} minutes)`}
                  </Text>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Profile;
