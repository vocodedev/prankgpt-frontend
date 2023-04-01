export type VerificationType = "callerId" | "normal";

export const isCallerIdVerified = async (
  phoneNumber: string
): Promise<boolean> => {
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

export const sendCallerIdValidation = async (
  phoneNumber: string
): Promise<string> => {
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
