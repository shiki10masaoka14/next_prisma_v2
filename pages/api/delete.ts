import { PrismaClient, Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo>,
) => {
  const { id } = req.body;
  const deleteTask = await prisma.todo.delete({
    where: { id },
  });
  res.json(deleteTask);
};

export default handle;
