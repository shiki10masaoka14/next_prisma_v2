import { Box, Flex, Spacer } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PROPS = {
  children: ReactNode;
  bg?: string;
};

export const Layout: VFC<PROPS> = memo((props) => {
  return (
    <Flex flexDirection={"column"} minH={"100vh"}>
      <Header />
      <Box>{props.children}</Box>
      <Spacer bg={props.bg} />
      <Footer />
    </Flex>
  );
});
Layout.displayName = "Layout";
