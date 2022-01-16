import { PrismaClient, Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo>,
) => {
  const { id, isComplete } = req.body;
  const check = await prisma.todo.update({
    where: { id },
    data: { isComplete: isComplete },
  });
  res.json(check);
};

export default handle;
