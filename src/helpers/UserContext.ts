import React from "react";

type UserContextType = {
  user: {
    id: string;
    phoneNumber: string;
  } | null;
  setUser: (user: any) => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: any) => {},
};

export const UserContext = React.createContext(defaultUserContext);
