import {
  Avatar,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import Router from "next/router";
import { MouseEvent, memo, VFC } from "react";
import useSWR, { mutate } from "swr";
import { Layout } from "../components/Layout";
import { fetcher } from "../lib/fetcher";

const Home: VFC = memo(() => {
  const { data: users, error } = useSWR<Array<User>>(
    "/api/users",
    fetcher,
  );
  if (!users) {
    return (
      <Center minH={"100vh"} color={"gray.500"}>
        <Spinner size="xl" mr={"2"} />
        <Heading>Loading...</Heading>
      </Center>
    );
  }
  if (error) {
    console.error(error);
  }

  const onClickCard = async (
    e: MouseEvent<HTMLDivElement>,
  ) => {
    const id = e.currentTarget.id;
    await mutate(`/api/detail`, "", false);
    await Router.push(`/detail/[id]`, `/detail/${id}`);
  };

  return (
    <Layout bg={"gray.100"}>
      <SimpleGrid
        minChildWidth={200}
        spacing={4}
        p={4}
        bg={"gray.100"}
      >
        {users.map((user) => (
          <VStack
            bg={"white"}
            borderRadius={10}
            p={3}
            spacing={2}
            key={user.id}
            onClick={onClickCard}
            id={String(user.id)}
            cursor={"pointer"}
          >
            <Avatar
              src={user.imageUrl}
              alt="avatar"
              fallbackSrc="150.png"
              size={"xl"}
            />
            <Heading size={"md"} color={"gray.700"}>
              {user.username}
            </Heading>
            <Text color={"gray.400"} fontSize={14}>
              {user.name}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Layout>
  );
});
Home.displayName = "Home";

export default Home;
