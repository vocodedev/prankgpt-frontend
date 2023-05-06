import {
  Box,
  Flex,
  FormControl,
  HStack,
  Spacer,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import CoffeeButton from "./CoffeeButton";
import Profile from "./Profile";
import React from "react";
import { SessionContext } from "../helpers/SessionContext";

const HeaderProvider = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { session } = React.useContext(SessionContext);
  return (
    <>
      <header>
        <Flex p={2} justify={"flex-end"}>
          <Spacer />
          <Box>
            <FormControl display="flex" alignItems="center">
              <HStack>
                {<Profile />}
                <Box padding="10px">
                  <Switch
                    onChange={toggleColorMode}
                    isChecked={colorMode === "dark"}
                  />
                </Box>
              </HStack>
            </FormControl>
          </Box>
        </Flex>
      </header>
      {props.children}
    </>
  );
};

export default HeaderProvider;
