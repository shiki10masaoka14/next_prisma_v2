import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<Array<User>>,
) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export default handle;
