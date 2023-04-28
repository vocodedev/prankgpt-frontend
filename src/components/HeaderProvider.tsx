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

const HeaderProvider = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <header>
        <Flex p={2} w="100%" justify={"flex-end"}>
          <Spacer />
          <Box>
            <FormControl display="flex" alignItems="center">
              <HStack>
                <CoffeeButton />
                <Switch
                  onChange={toggleColorMode}
                  isChecked={colorMode === "dark"}
                />
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
