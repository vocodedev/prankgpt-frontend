import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../helpers/SessionContext";
import { VerificationType } from "../helpers/verification";
import LoginForm from "./LoginForm";
import PhoneVerification from "./PhoneVerification";

const Login = ({
  onLogin,
  verificationType,
}: {
  onLogin: () => void;
  verificationType: VerificationType;
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const { session } = React.useContext(SessionContext);
  const [showVerificationScreen, setShowVerificationScreen] =
    React.useState(false);

  React.useEffect(() => {
    if (verificationType === "normal" && session?.user) {
      onLogin();
    }
  }, [session]);

  const onLoginFormSubmit = () => setShowVerificationScreen(true);

  if (showVerificationScreen) {
    return (
      <PhoneVerification
        verificationType={verificationType}
        phoneNumber={phoneNumber}
      />
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
