import React, { useState } from "react";
import { getChats } from "../helpers/ChatHelpers";
import { HStack, VStack, Box, StackDivider, Divider } from "@chakra-ui/react";
import ChatScreen from "./ChatScreen";
import ChatHighlight from "./ChatHighlight";
export interface Chat {
  id: number;
  recipient: string;
  messages: Message[];
}

export interface Message {
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatsProps {}

const Chats: React.FC<ChatsProps> = () => {
  const chats = getChats();
  const [chatSelected, setChatSelected] = useState(
    chats.length > 0 ? chats[0].id : null
  );

  return (
    <HStack>
      <Box h="100vh" w="25%" overflowY="scroll">
        <VStack
          divider={<StackDivider borderColor="black" />}
          spacing={4}
          align="stretch"
        >
          {chats.map((chat) => (
            <ChatHighlight chat={chat} setChatSelected={setChatSelected} />
          ))}
        </VStack>
      </Box>
      <ChatScreen chat={chats.find((chat) => chat.id === chatSelected)} />
      <Box>{chatSelected}</Box>
    </HStack>
  );
};

export default Chats;
