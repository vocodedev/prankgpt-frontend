import React from "react";

const defaultUserContext = {
  user: null,
  setUser: (user: any) => {},
};

export const UserContext = React.createContext(defaultUserContext);
