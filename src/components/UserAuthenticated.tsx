import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../helpers/UserContext";

const UserAuthenticated = (props: any) => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{props.children}</>;
};

export default UserAuthenticated;
