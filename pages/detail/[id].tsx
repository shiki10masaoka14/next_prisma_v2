import {
  Avatar,
  Button,
  Center,
  Heading,
  Input,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import Router, { useRouter } from "next/router";
import {
  ChangeEvent,
  FocusEvent,
  memo,
  ReactNode,
  useState,
  VFC,
} from "react";
import useSWR, { mutate } from "swr";
import { Layout } from "../../components/Layout";
import { fetcher } from "../../lib/fetcher";

type PROPS = {
  children: ReactNode;
  user: User;
};

const detail: VFC<PROPS> = memo(() => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const { data: detail, error } = useSWR<User>(
    "/api/detail",
    (url) => fetcher(url, { id }),
  );
  if (!detail) {
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

  const onFocusUsername = () =>
    setUsername(detail.username);
  const onChangeUsername = (
    e: ChangeEvent<HTMLInputElement>,
  ) => setUsername(e.target.value);
  const onBlurUsername = async (
    e: FocusEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const item = "username";
    const value = username;
    await fetcher(`/api/update`, { id, item, value });
    await mutate(`/api/detail`);
  };

  const onFocusName = () => setName(detail.name);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onBlurName = async (
    e: FocusEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const item = "name";
    const value = name;
    await fetcher(`/api/update`, { id, item, value });
    await mutate(`/api/detail`);
  };

  const onFocusEmail = () => setEmail(detail.email);
  const onChangeEmail = (
    e: ChangeEvent<HTMLInputElement>,
  ) => setEmail(e.target.value);
  const onBlurEmail = async (
    e: FocusEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const item = "email";
    const value = email;
    await fetcher(`/api/update`, { id, item, value });
    await mutate(`/api/detail`);
  };

  const onFocusPhone = () => setPhone(detail.phone);
  const onChangePhone = (
    e: ChangeEvent<HTMLInputElement>,
  ) => setPhone(e.target.value);
  const onBlurPhone = async (
    e: FocusEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const item = "phone";
    const value = phone;
    await fetcher(`/api/update`, { id, item, value });
    await mutate(`/api/detail`);
  };

  const onClickBack = () => {
    Router.push(`/home`);
  };

  return (
    <Layout>
      <Table maxW={600} mx={"auto"} mb={10}>
        <TableCaption placement="top">
          <Avatar
            size={"2xl"}
            src={detail.imageUrl}
            alt="avatar"
          />
        </TableCaption>
        <Tbody>
          <Tr>
            <Td>username</Td>
            <Td>
              <Input
                id={String(detail.id)}
                placeholder={detail.username}
                _placeholder={{ color: "gray.700" }}
                value={username}
                onFocus={onFocusUsername}
                onChange={onChangeUsername}
                onBlur={onBlurUsername}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>name</Td>
            <Td>
              <Input
                id={String(detail.id)}
                placeholder={detail.name}
                _placeholder={{ color: "gray.700" }}
                value={name}
                onFocus={onFocusName}
                onChange={onChangeName}
                onBlur={onBlurName}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>email</Td>
            <Td>
              <Input
                id={String(detail.id)}
                placeholder={detail.email}
                _placeholder={{ color: "gray.700" }}
                value={email}
                onFocus={onFocusEmail}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>phone</Td>
            <Td>
              <Input
                id={String(detail.id)}
                placeholder={detail.phone}
                _placeholder={{ color: "gray.700" }}
                value={phone}
                onFocus={onFocusPhone}
                onChange={onChangePhone}
                onBlur={onBlurPhone}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Center>
        <Button onClick={onClickBack}>
          Return to list
        </Button>
      </Center>
    </Layout>
  );
});
detail.displayName = "detail";

export default detail;
