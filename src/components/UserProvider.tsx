import React from "react";
import { UserContext } from "../helpers/UserContext";

const UserProvider = (props: any) => {
  const [user, setUser] = React.useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
