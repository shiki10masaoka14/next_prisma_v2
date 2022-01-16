import {
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { memo, VFC } from "react";

export const Header: VFC = memo(() => {
  return (
    <Flex
      bg={"gray.500"}
      p={4}
      justify={"space-between"}
      align={"center"}
    >
      <Heading color={"white"}>
        <NextLink href={"/home"} passHref>
          <Link _hover={{ textDecoration: "none" }}>
            ユーザー管理アプリ
          </Link>
        </NextLink>
      </Heading>
      <Text color={"white"} fontSize={20}>
        <NextLink href="/" passHref>
          <Link>Logout</Link>
        </NextLink>
      </Text>
    </Flex>
  );
});
Header.displayName = "Header";
