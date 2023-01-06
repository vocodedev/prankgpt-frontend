import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import PhoneVerification from "./components/PhoneVerification";
import Chat from "./components/Chat";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./components/Main";
import { UserContext } from "./helpers/UserContext";
import UserProvider from "./components/UserProvider";

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
    element: <Chat />,
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
