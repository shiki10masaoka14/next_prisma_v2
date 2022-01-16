import {
  Button,
  Center,
  Checkbox,
  Container,
  Heading,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
  useBoolean,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import {
  ChangeEvent,
  FocusEvent,
  memo,
  MouseEvent,
  useState,
  VFC,
} from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../lib/fetcher";

const Practice: VFC = memo(() => {
  const [task, setTask] = useState("");
  const [readOnly, setReadOnly] = useBoolean(true);
  const [all, setAll] = useState(true);
  const [completed, setCompleted] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlayWord, setOverlayWord] =
    useState("Loading...");

  const { data: todos, error } = useSWR<Array<Todo>>(
    "/api/todos",
    fetcher,
  );
  if (!todos) {
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

  const onChangeAdd = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setTask(e.currentTarget.value);
  };

  const onClickAdd = async () => {
    setOverlayWord("Registering...");
    onOpen();
    await fetcher(`/api/create`, { task });
    await mutate(`/api/todos`);
    setTask("");
    onClose();
  };

  const onClickActive = () => {
    setAll(false);
    setCompleted(false);
  };

  const onClickComplete = () => {
    setAll(false);
    setCompleted(true);
  };

  const onChangeCheck = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const isComplete = e.currentTarget.checked;
    await fetcher(`/api/check`, { id, isComplete });
    await mutate(`/api/todos`);
  };

  const onFocusTask = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.placeholder;
    e.currentTarget.value = value;
  };

  const onBlurEdit = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    await fetcher(`/api/edit`, { id, value });
    await mutate(`/api/todos`);
  };

  const onClickDelete = async (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    setOverlayWord("Deleting...");
    onOpen();
    const id = e.currentTarget.id;
    await fetcher(`/api/delete`, { id });
    await mutate(`/api/todos`);
    onClose();
  };

  return (
    <>
      <Container color={"gray.600"}>
        <Heading
          my={10}
          size={"2xl"}
          textAlign={"center"}
          as="h1"
        >
          TodoMatic
        </Heading>
        <Heading mb={4} size={"md"} textAlign={"center"}>
          What needs to be done?
        </Heading>
        <VStack spacing={4} mb={10}>
          <Input value={task} onChange={onChangeAdd} />
          <Button isFullWidth onClick={onClickAdd}>
            add
          </Button>
          <HStack>
            <Button onClick={() => setAll(true)}>
              Show all tasks
            </Button>
            <Button onClick={onClickActive}>
              Show active tasks
            </Button>
            <Button onClick={onClickComplete}>
              Show completed tasks
            </Button>
          </HStack>
        </VStack>
        <Table>
          <TableCaption placement="top">
            <HStack spacing={10}>
              <Heading>
                {
                  todos.filter((todo) =>
                    all
                      ? todo.isComplete !== null
                      : todo.isComplete === completed,
                  ).length
                }{" "}
                tasks remaining
              </Heading>
              <Button onClick={setReadOnly.toggle}>
                Edit
              </Button>
            </HStack>
          </TableCaption>
          <Tbody>
            {todos
              .filter((todo) =>
                all
                  ? todo.isComplete !== null
                  : todo.isComplete === completed,
              )
              .map((todo) => (
                <Tr key={todo.id}>
                  <Td w={"60%"}>
                    <HStack>
                      <Checkbox
                        id={String(todo.id)}
                        defaultIsChecked={todo.isComplete}
                        onChange={onChangeCheck}
                      >
                        {readOnly && todo.todo}
                      </Checkbox>
                      {readOnly || (
                        <Input
                          id={String(todo.id)}
                          placeholder={todo.todo}
                          onFocus={onFocusTask}
                          onBlur={onBlurEdit}
                        />
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    <Button
                      id={String(todo.id)}
                      onClick={onClickDelete}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <Center minH={"100vh"} color={"gray.50"}>
            <Spinner size="xl" mr={"2"} />
            <Heading>{overlayWord}</Heading>
          </Center>
        </ModalOverlay>
      </Modal>
    </>
  );
});
Practice.displayName = "Practice";

export default Practice;
