import CustomPhoneInput from "./CustomPhoneInput";
import React from "react";
import "./Login.css";
import { createSearchParams, useNavigate } from "react-router-dom";

const Login: React.FC = ({
  }) => {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = () => {
      navigate(`/verify?${createSearchParams({ phoneNumber })}`);
    }

    return (
      <div className="Login">
        <h1>Welcome to Delphi</h1>
        <br/>
        <form onSubmit={onSubmit}>
          <CustomPhoneInput
            onChange={setPhoneNumber}
            value={phoneNumber}
            defaultCountry={"US"}
          />
        </form>
      </div>
    );
  };
  
  export default Login;