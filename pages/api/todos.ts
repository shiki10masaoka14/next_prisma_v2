import { PrismaClient, Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Array<Todo>>,
) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export default handle;
