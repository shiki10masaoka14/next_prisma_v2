import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const todos: Todo[] = [
    {
      id: "1",
      todo: "eat",
      isComplete: false,
    },
    {
      id: "2",
      todo: "work",
      isComplete: false,
    },
    {
      id: "3",
      todo: "sleep",
      isComplete: false,
    },
  ];

  await Promise.all(
    todos.map(async (todo) => {
      await prisma.todo.create({
        data: todo,
      });
    }),
  );
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
