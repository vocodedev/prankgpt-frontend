import React from "react";

const defaultUserContext = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: any) => {},
};

export const UserContext = React.createContext(defaultUserContext);
