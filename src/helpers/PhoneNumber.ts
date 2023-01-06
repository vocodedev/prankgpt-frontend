export const stripPhoneNumber = (formattedPhoneNumber: string) =>
  formattedPhoneNumber.replace(/\D/g, "");

export const toTwilioFormat = (phoneNumber: string) =>
  `+1${stripPhoneNumber(phoneNumber)}`;
