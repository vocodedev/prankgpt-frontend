import { ArrowUpIcon } from "@chakra-ui/icons";
import { Input, HStack, IconButton, Box, Spinner } from "@chakra-ui/react";
import React from "react";

const MessageInput = ({
  onSubmit,
}: {
  onSubmit: (message: string) => Promise<boolean>;
}) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    onSubmit(message).then((success) => {
      if (success) {
        setMessage("");
      }
      setLoading(false);
    });
  };

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <HStack bg="gray.100">
        <Input
          variant="unstyled"
          padding={2}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
        />
        <Box paddingRight={2}>
          {loading && <Spinner />}
          {!loading && (
            <IconButton
              borderRadius={20}
              size="xs"
              colorScheme="blue"
              aria-label="Send messave"
              icon={<ArrowUpIcon />}
              onClick={handleSubmit}
            />
          )}
        </Box>
      </HStack>
    </form>
  );
};

export default MessageInput;
