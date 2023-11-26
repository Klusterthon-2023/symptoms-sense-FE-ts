import React from "react";
import { Divider as ChakraDivider, DividerProps } from "@chakra-ui/react";

const Divider: React.FC<DividerProps> = () => {
  return (
    <ChakraDivider w="100%" borderBottomWidth="3px" color="black" mt="5" />
  );
};

export default Divider;