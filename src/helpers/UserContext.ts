import React from "react";

export type UserType = {
  id: string;
  phoneNumber: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: (user: any) => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: any) => {},
};

export const UserContext = React.createContext(defaultUserContext);
