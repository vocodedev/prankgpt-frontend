import { Box } from "@chakra-ui/layout";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";
import { UserContext } from "../helpers/UserContext";

const LiveChatSwitch = ({
  label,
  onChange,
  isChecked,
  disabled = false,
}: {
  label: string;
  onChange: (event: any) => void;
  isChecked: boolean;
  disabled?: boolean;
}) => {
  return (
    <Box>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">{label}</FormLabel>
        <Switch onChange={onChange} disabled={disabled} isChecked={isChecked} />
      </FormControl>
    </Box>
  );
};

export default LiveChatSwitch;
