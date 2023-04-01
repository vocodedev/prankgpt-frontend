import {
  Box,
  Center,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { PinInput, PinInputField, Button } from "@chakra-ui/react";
import React from "react";
import { SessionContext } from "../helpers/SessionContext";
import { supabase } from "../services/supabase";
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
  console.log(data);
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

// const sendVerificationCode = async (phoneNumber: string): Promise<boolean> => {
//   const response = await fetch(
//     `https://${process.env.REACT_APP_BACKEND_URL}/send_verification_code`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         phone_number: phoneNumber,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   return data.success;
// };

// const verifyPhoneNumber = async (
//   phoneNumber: string,
//   code: string
// ): Promise<boolean> => {
//   const response = await fetch(
//     `https://${process.env.REACT_APP_BACKEND_URL}/verify_phone_number`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         phone_number: phoneNumber,
//         code,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   return data.status === "approved";
// };

// const getOrCreateUser = async (phoneNumber: string): Promise<object> => {
//   return await fetch(
//     `https://${process.env.REACT_APP_BACKEND_URL}/get_or_create_user`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         phone_number: phoneNumber,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   ).then((response) => response.json());
// };

const PhoneVerification = ({
  phoneNumber,
  anonymous,
}: {
  phoneNumber: string;
  anonymous: boolean;
}) => {
  const { session } = React.useContext(SessionContext);

  const [verificationCode, setVerificationCode] = React.useState("");
  const [isCallerIdVerification, setIsCallerIdVerification] =
    React.useState(false);
  const [isNormalVerification, setIsNormalVerification] = React.useState(false);

  const signInWithOtp = (phoneNumber: string) => {
    supabase.auth
      .signInWithOtp({
        phone: phoneNumber,
      })
      .then((error) => {
        setIsNormalVerification(true);
      });
  };

  React.useEffect(() => {
    const waitForCallerIdVerified = async (phoneNumber: string) => {
      let callerIdVerified = false;
      while (!callerIdVerified) {
        callerIdVerified = await isCallerIdVerified(phoneNumber);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    if (!anonymous) {
      isCallerIdVerified(phoneNumber).then((verified) => {
        if (verified) {
          signInWithOtp(phoneNumber);
        } else {
          sendCallerIdValidation(phoneNumber).then((code) => {
            setIsCallerIdVerification(true);
            setVerificationCode(code);
            waitForCallerIdVerified(phoneNumber);
          });
        }
      });
    } else {
      signInWithOtp(phoneNumber);
    }
  }, []);

  if (!phoneNumber) return <ErrorPage />;

  const pinInputStyles = {
    textAlign: "center" as const,
    height: "60px",
    width: "40px",
    marginRight: "4px",
    fontSize: "30px",
  };

  const isReadOnly = isCallerIdVerification;

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  const onSubmit = async () => {
    await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: verificationCode,
      type: "sms",
    });
  };

  return (
    <div className="code">
      <Container flex="1">
        <Center>
          <form onSubmit={onFormSubmit}>
            <VStack>
              {isCallerIdVerification && (
                <Text>
                  We're setting up your phone's caller ID in our system. You'll
                  receive a call. When prompted, please enter the number
                  displayed below.
                </Text>
              )}
              {isNormalVerification && (
                <Text>Enter the code we've just texted you.</Text>
              )}
              <HStack>
                <PinInput
                  value={verificationCode}
                  onChange={setVerificationCode}
                  isDisabled={isReadOnly}
                  otp
                  size="lg"
                >
                  <PinInputField style={pinInputStyles} />
                  <PinInputField style={pinInputStyles} />
                  <PinInputField style={pinInputStyles} />
                  <PinInputField style={pinInputStyles} />
                  <PinInputField style={pinInputStyles} />
                  <PinInputField style={pinInputStyles} />
                </PinInput>
              </HStack>
              {isNormalVerification && <Button type="submit">Submit</Button>}
            </VStack>
          </form>
        </Center>
      </Container>
    </div>
  );
};

export default PhoneVerification;
