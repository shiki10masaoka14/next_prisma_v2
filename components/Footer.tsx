import { Center, Text } from "@chakra-ui/react";
import { memo, VFC } from "react";

export const Footer: VFC = memo(() => {
  return (
    <Center bg={"gray.500"} py={3}>
      <Text color={"white"} fontSize={16}>
        &copy;Sample, Inc.
      </Text>
    </Center>
  );
});
Footer.displayName = "Footer";
