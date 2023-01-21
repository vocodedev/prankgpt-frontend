import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Main from "./components/Main";
import UserProvider from "./components/UserProvider";
import LiveChat from "./components/LiveChat";
import DarkModeProvider from "./components/DarkModeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/chat/:chatId",
    element: <LiveChat />,
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <DarkModeProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </DarkModeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
