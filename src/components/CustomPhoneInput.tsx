import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./CustomPhoneInput.css";

interface CustomPhoneInputProps {
  defaultCountry?: any;
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
      countries={["US"]}
      addInternationalOption={false}
      defaultCountry={defaultCountry || "US"}
      onChange={onChange}
      value={value}
      className="custom-phone-input"
    />
  );
};

export default CustomPhoneInput;
