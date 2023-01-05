import { Chat } from "../components/Chats";

export const getChats = (): Chat[] => {
  return [
    {
      id: 1,
      recipient: "4086600744",
      messages: [{ content: "hi" }],
    },
    {
      id: 2,
      recipient: "123456789",
      messages: [
        { content: "hi there" },
        { content: "how are you?" },
        { content: "good and you?" },
      ],
    },
    {
      id: 3,
      recipient: "20370259720",
      messages: [{ content: "hi" }],
    },
  ];
};
