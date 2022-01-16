import { PrismaClient, Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo>,
) => {
  const { id, value } = req.body;
  const edit = await prisma.todo.update({
    where: { id },
    data: { todo: value },
  });
  res.json(edit);
};

export default handle;
