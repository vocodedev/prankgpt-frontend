import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Main from "./components/Main";
import SessionProvider from "./components/SessionProvider";
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
          <SessionProvider>
            <RouterProvider router={router} />
          </SessionProvider>
        </DarkModeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
