import { Box } from "@chakra-ui/layout";
import React from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const isCallerIdVerified = async (phoneNumber: string): Promise<boolean> => {
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/caller_id_verified`,
    {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.verified;
};

const sendCallerIdValidation = async (phoneNumber: string): Promise<string> => {
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/create_caller_id`,
    {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.code;
};

const sendVerificationCode = async (phoneNumber: string): Promise<boolean> => {
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/send_verification_code`,
    {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.success;
};

const verifyPhoneNumber = async (
  phoneNumber: string,
  code: string
): Promise<boolean> => {
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/verify_phone_number`,
    {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
        code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.status;
};

const PhoneVerification = () => {
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");

  const [verificationCode, setVerificationCode] = React.useState("");
  const [isCallerIdVerification, setIsCallerIdVerification] =
    React.useState(false);
  const [isNormalVerification, setIsNormalVerification] = React.useState(false);

  React.useEffect(() => {
    if (phoneNumber) {
      isCallerIdVerified(phoneNumber).then((verified) => {
        if (verified) {
          Promise.resolve(sendVerificationCode(phoneNumber));
          setIsNormalVerification(true);
        } else {
          sendCallerIdValidation(phoneNumber).then((code) => {
            setIsCallerIdVerification(true);
            setVerificationCode(code);
          });
        }
      });
    }
  }, []);

  if (!phoneNumber) return <ErrorPage />;

  return (
    <Box>
      <p>Phone Number: {phoneNumber}</p>
    </Box>
  );
};

export default PhoneVerification;
