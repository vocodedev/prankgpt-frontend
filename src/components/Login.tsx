import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import PhoneVerification from "./PhoneVerification";

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [showVerificationScreen, setShowVerificationScreen] =
    React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (verified) {
      onLogin();
    }
  }, [verified]);

  const onLoginFormSubmit = () => setShowVerificationScreen(true);

  if (showVerificationScreen) {
    return (
      <PhoneVerification phoneNumber={phoneNumber} setVerified={setVerified} />
    );
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
