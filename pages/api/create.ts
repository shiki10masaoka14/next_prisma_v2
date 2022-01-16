import { PrismaClient, Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo>,
) => {
  const { task } = req.body;
  const create = await prisma.todo.create({
    data: { todo: task },
  });
  res.json(create);
};

export default handle;
