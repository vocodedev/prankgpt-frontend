import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Main from "./components/Main";
import SessionProvider from "./components/SessionProvider";
import LiveChat from "./components/LiveChat";
import HeaderProvider from "./components/HeaderProvider";

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
        <SessionProvider>
          <HeaderProvider>
            <RouterProvider router={router} />
          </HeaderProvider>
        </SessionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
