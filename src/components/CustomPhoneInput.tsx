import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomPhoneInputProps {
  defaultCountry?: string;
  onChange: (value: string) => void;
  value: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  defaultCountry,
  onChange,
  value,
}) => {
  return (
    <PhoneInput
      defaultCountry={defaultCountry || "US"}
      onChange={onChange}
      value={value}
      className="custom-phone-input"
    />
  );
};

export default CustomPhoneInput;
