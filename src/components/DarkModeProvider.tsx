import {
  Flex,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
} from "@chakra-ui/react";

const DarkModeProvider = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <header>
        <Flex p={2} w="90%" align={"right"} justify={"flex-end"}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              {colorMode}
            </FormLabel>
            <Switch
              onChange={toggleColorMode}
              isChecked={colorMode === "dark"}
            />
          </FormControl>
        </Flex>
      </header>
      {props.children}
    </>
  );
};

export default DarkModeProvider;
