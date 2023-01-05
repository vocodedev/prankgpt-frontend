import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomPhoneInput from "./components/CustomPhoneInput";

function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> hi and save to reload.
        </p>
        <CustomPhoneInput
          onChange={setValue}
          value={value}
          defaultCountry={"US"}
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
