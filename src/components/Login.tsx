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
  const [captchaToken, setCaptchaToken] = React.useState<string>("");
  const captchaRef = React.useRef();

  React.useEffect(() => {
    if (verificationType === "normal" && session?.user) {
      onLogin();
    }
  }, [session]);

  const onLoginFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setShowVerificationScreen(true);
  };

  if (showVerificationScreen) {
    return (
      <PhoneVerification
        verificationType={verificationType}
        phoneNumber={phoneNumber}
        setShowVerificationScreen={setShowVerificationScreen}
        captchaToken={captchaToken}
        captchaRef={captchaRef}
      />
    );
  } else {
    return (
      <LoginForm
        verificationType={verificationType}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setCaptchaToken={setCaptchaToken}
        captchaRef={captchaRef}
        onSubmit={onLoginFormSubmit}
      />
    );
  }
};

export default Login;
