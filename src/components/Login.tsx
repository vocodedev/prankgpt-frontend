import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../helpers/SessionContext";
import LoginForm from "./LoginForm";
import PhoneVerification from "./PhoneVerification";

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const { session } = React.useContext(SessionContext);
  const [showVerificationScreen, setShowVerificationScreen] =
    React.useState(false);

  React.useEffect(() => {
    if (session?.user) {
      onLogin();
    }
  }, [session]);

  const onLoginFormSubmit = () => setShowVerificationScreen(true);

  if (showVerificationScreen) {
    return <PhoneVerification phoneNumber={phoneNumber} />;
  } else {
    return (
      <LoginForm
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onSubmit={onLoginFormSubmit}
      />
    );
  }
};

export default Login;
