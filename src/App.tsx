import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import PhoneVerification from "./components/PhoneVerification";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./components/Main";
import UserProvider from "./components/UserProvider";
import LiveChat from "./components/LiveChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <PhoneVerification />,
  },
  {
    path: "/chat/:chatId",
    element: <LiveChat />,
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;